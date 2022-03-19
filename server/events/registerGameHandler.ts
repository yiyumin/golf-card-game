import {
  GameProps,
  Card,
  ErrorType,
} from '@yiyumin/golf-card-game-library/types';
import { GolfServer, GolfSocket } from '../types';

import { GameStoreInterface } from '../stores/gameStore';

const registerGameHandler = (
  io: GolfServer,
  socket: GolfSocket,
  gameStore: GameStoreInterface
) => {
  const createGame = (cb: (gameId: string) => void) => {
    cb(gameStore.createGame());
  };

  const joinGame = (gameId: string, cb: (gameProps: GameProps) => void) => {
    socket.join(gameId);

    const game = gameStore.findGame(gameId);

    if (game.hasPlayer(socket.data.userId)) {
      socket.to(gameId).emit('player-rejoined-game', socket.data.userId);
      game.connectPlayer(socket.data.userId);
    } else {
      game.addPlayer(socket.data.userId);
      socket
        .to(gameId)
        .emit('player-joined-game', game.getPlayer(socket.data.userId));
    }

    cb(game.getStateForPlayer(socket.data.userId));
  };

  const onDisconnecting = () => {
    socket.rooms.forEach((gameId) => {
      const game = gameStore.findGame(gameId);

      if (game && game.hasPlayer(socket.data.userId)) {
        game.disconnectPlayer(socket.data.userId);

        if (!game.isAnyPlayerConnected()) {
          gameStore.deleteGame(gameId);
          return;
        }

        io.to(gameId).emit('player-disconnected', socket.data.userId);
      }
    });
  };

  const kickPlayer = (gameId: string, playerId: string) => {
    const game = gameStore.findGame(gameId);

    game.removePlayer(playerId);
    io.to(gameId).emit('player-left-game', {
      playerId,
      playerTurnId: game.getPlayerTurnId(),
      turnState: game.getTurnState(),
    });

    if (!game.isAnyPlayerConnected()) {
      gameStore.deleteGame(gameId);
    } else if (game.isGameFinished()) {
      io.to(gameId).emit('round-finished', {
        players: {},
        roundLoserIds: [],
        gameWinnerId: game.gameWinnerId,
      });
    } else if (game.isRoundStartable()) {
      startRound(gameId);
    }
  };

  const changeName = (gameId: string, name: string) => {
    gameStore.findGame(gameId).changeName(socket.data.userId, name);
    socket.to(gameId).emit('player-name-changed', {
      playerId: socket.data.userId,
      name,
    });
  };

  const changeGameWord = (gameId: string, gameWord: string) => {
    gameStore.findGame(gameId).changeGameWord(gameWord);
    io.to(gameId).emit('game-word-changed', gameWord);
  };

  const startGame = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    if (!game.isGameStartable()) return;

    game.initializeGame();
    game.getGamePlayerIds().forEach((playerId) => {
      io.to(playerId).emit('game-started', {
        gameId,
        player: game.getPlayer(playerId),
        players: game.getPlayers(playerId),
      });
    });
  };

  const startRound = (gameId: string) => {
    const game = gameStore.findGame(gameId);
    game.startRound();

    io.to(gameId).emit('round-started', {
      discardPileTop: game.getDiscardPileTopCard(),
      playerTurnId: game.getPlayerTurnId(),
      drawPileCardCount: game.getDrawPileCardCount(),
    });
  };

  const resetGame = (gameId: string) => {
    gameStore.findGame(gameId).resetGame();
    io.to(gameId).emit('game-reset');
  };

  const dealNewRound = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    io.to(gameId).emit('round-reset');
    game.initializeRound();

    game.getGamePlayerIds().forEach((playerId) => {
      io.to(playerId).emit('cards-dealt', {
        gameId,
        cards: game.getDealtCardsForPlayer(playerId),
        roundPlayerIds: game.getRoundPlayerIds(),
      });
    });
  };

  const toggleGameReady = (
    gameId: string,
    cb: (isGameReady: boolean) => void
  ) => {
    const game = gameStore.findGame(gameId);

    game.togglePlayerGameReady(socket.data.userId);
    cb(game.isPlayerGameReady(socket.data.userId));

    socket.to(gameId).emit('player-game-ready-changed', {
      playerId: socket.data.userId,
      isGameReady: game.isPlayerGameReady(socket.data.userId),
    });
  };

  const toggleRoundReady = (
    gameId: string,
    cb: (isRoundReady: boolean) => void
  ) => {
    const game = gameStore.findGame(gameId);

    game.togglePlayerRoundReady(socket.data.userId);
    cb(game.isPlayerRoundReady(socket.data.userId));

    socket.to(gameId).emit('player-round-ready-changed', {
      playerId: socket.data.userId,
      isRoundReady: game.isPlayerRoundReady(socket.data.userId),
    });

    if (game.isRoundStartable()) {
      startRound(gameId);
    }
  };

  const takeDiscardPile = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    io.to(gameId).emit('discard-pile-taken', game.getPlayerTurnId());
    game.takeFromDiscardPile();
  };

  const takeDrawPile = (gameId: string, cb: (card: Card) => void) => {
    const game = gameStore.findGame(gameId);

    io.to(gameId).emit('draw-pile-taken', game.getPlayerTurnId());
    cb(game.takeFromDrawPile());
  };

  const discardCard = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    game.discardCard();
    io.to(gameId).emit('card-discarded', {
      playerId: game.getPlayerTurnId(),
      discardedCard: game.getDiscardPileTopCard(),
    });
  };

  const swapCard = (gameId: string, swapCardIdx: number) => {
    const game = gameStore.findGame(gameId);

    game.swapCard(socket.data.userId, swapCardIdx);
    io.to(gameId).emit('card-swapped', {
      playerId: game.getPlayerTurnId(),
      discardedCard: game.getDiscardPileTopCard(),
      swapCardIdx,
    });
  };

  const finishTurn = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    game.finishTurn();

    if (game.isRoundFinished()) {
      io.to(gameId).emit('turn-finished');
      io.to(gameId).emit('round-finished', game.calculateRoundResult());
    } else {
      io.to(gameId).emit('turn-finished', game.getPlayerTurnId());
    }
  };

  const callGolf = (gameId: string) => {
    const game = gameStore.findGame(gameId);

    game.callGolf(socket.data.userId);
    io.to(gameId).emit('golf-called', socket.data.userId);
    io.to(gameId).emit('turn-finished', game.getPlayerTurnId());
  };

  socket.use(([event, gameId, ...args], next) => {
    if (event === 'create-game' || event === 'disconnecting') {
      return next();
    }

    if (!gameStore.doesGameExist(gameId)) {
      return next(new Error('game_not_found' as ErrorType));
    }

    if (
      (event === 'take-discard-pile' ||
        event === 'take-draw-pile' ||
        event === 'swap-card' ||
        event === 'discard-card') &&
      socket.data.userId !== gameStore.findGame(gameId).getPlayerTurnId()
    ) {
      return next(new Error('not_player_turn' as ErrorType));
    }

    next();
  });

  socket.on('create-game', createGame);

  socket.on('join-game', joinGame);
  socket.on('disconnecting', onDisconnecting);
  socket.on('kick-player', kickPlayer);

  socket.on('change-name', changeName);
  socket.on('change-game-word', changeGameWord);

  socket.on('start-game', startGame);
  socket.on('reset-game', resetGame);
  socket.on('deal-new-round', dealNewRound);

  socket.on('toggle-game-ready', toggleGameReady);
  socket.on('toggle-round-ready', toggleRoundReady);

  socket.on('take-discard-pile', takeDiscardPile);
  socket.on('take-draw-pile', takeDrawPile);

  socket.on('discard-card', discardCard);
  socket.on('swap-card', swapCard);

  socket.on('finish-turn', finishTurn);
  socket.on('call-golf', callGolf);
};

export default registerGameHandler;
