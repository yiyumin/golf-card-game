import { useEffect, useState, useCallback } from 'react';

import { Socket } from 'socket.io-client';

import {
  Card,
  PlayerWithPlayerCards,
  GameState,
  RoundState,
  TurnState,
  ServerToClientEvents,
  ClientToServerEvents,
} from '@yiyumin/golf-game-library/types';
import { Status } from '../types';

export type GameLogEntry = {
  playerIds?: string | string[];
  message: string;
};

const useGame = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  userId: string,
  gameId: string
) => {
  const [player, setPlayer] = useState<PlayerWithPlayerCards>({
    id: userId,
    name: userId,
    letterCount: 0,
    isGameReady: false,
    isRoundReady: false,
    isConnected: false,
  });
  const [players, setPlayers] = useState<PlayerWithPlayerCards[]>([]);

  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});

  const [gameWord, setGameWord] = useState('GOLF');
  const [playerTurnId, setPlayerTurnId] = useState<string>();

  const [gameState, setGameState] = useState<GameState>('not_started');
  const [roundState, setRoundState] = useState<RoundState>('not_started');
  const [turnState, setTurnState] = useState<TurnState>('not_started');

  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [drawPileCardCount, setDrawPileCardCount] = useState(0);
  const [takenCard, setTakenCard] = useState<Card>();

  const [golfCallerId, setGolfCallerId] = useState<string>();
  const [roundLoserIds, setRoundLoserIds] = useState<string[]>();
  const [gameWinnerId, setGameWinnerId] = useState<string>();

  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);

  useEffect(() => {
    socket.emit(
      'join-game',
      gameId,
      ({
        player,
        players,
        gameState,
        roundState,
        turnState,
        gameWord,
        playerTurnId,
        discardPile,
        drawPileCardCount,
        takenCard,
        golfCallerId,
        gameWinnerId,
        roundLoserIds,
      }) => {
        setPlayer(player);
        setPlayers(players);
        setGameState(gameState);
        setRoundState(roundState);
        setTurnState(turnState);
        setGameWord(gameWord);
        setPlayerTurnId(playerTurnId);
        setDiscardPile(discardPile);
        setDrawPileCardCount(drawPileCardCount);
        setTakenCard(takenCard);
        setGolfCallerId(golfCallerId);
        setGameWinnerId(gameWinnerId);
        setRoundLoserIds(roundLoserIds);

        const newPlayerNames = {
          ...players.reduce(
            (acc, { id, name }) => ({ ...acc, [id]: name }),
            {}
          ),
          [player.id]: player.name,
        };
        setPlayerNames(newPlayerNames);

        setGameLog((prevGameLog) => [
          ...prevGameLog,
          { playerIds: player.id, message: ' joined the game.' },
        ]);
      }
    );

    socket.on('game-started', ({ gameId: toGameId, player, players }) => {
      if (gameId !== toGameId) return;
      setPlayer(player);
      setPlayers(players);
      setGameState('started');
      setRoundState('cards_dealt');
      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { message: 'Game started.' },
        { message: 'New round. Cards dealt.' },
      ]);
    });

    socket.on('cards-dealt', ({ gameId: toGameId, cards, roundPlayerIds }) => {
      if (gameId !== toGameId) return;

      setPlayer((prevPlayer) => ({ ...prevPlayer, cards }));
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          roundPlayerIds.includes(player.id)
            ? {
                ...player,
                cards: ['facedown', 'facedown', 'facedown', 'facedown'],
              }
            : player
        )
      );
      setRoundState('cards_dealt');

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { message: 'New round. Cards dealt.' },
      ]);
    });
  }, [socket, gameId]);

  useEffect(() => {
    socket.on('player-joined-game', (player) => {
      setPlayers((prevPlayers) => [...prevPlayers, player]);

      setPlayerNames((prevPlayerNames) => ({
        ...prevPlayerNames,
        [player.id]: player.name,
      }));
      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { playerIds: player.id, message: ' joined the game.' },
      ]);
    });

    socket.on('player-rejoined-game', (playerId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId ? { ...player, isConnected: true } : player
        )
      );

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { playerIds: playerId, message: ' rejoined the game.' },
      ]);
    });

    socket.on('player-disconnected', (playerId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId
            ? {
                ...player,
                isConnected: false,
                isGameReady: false,
                isRoundReady: false,
              }
            : player
        )
      );

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { playerIds: playerId, message: ' disconnected.' },
      ]);
    });

    socket.on('player-name-changed', ({ playerId, name }) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId ? { ...player, name } : player
        )
      );

      setPlayerNames((prevPlayerNames) => ({
        ...prevPlayerNames,
        [playerId]: name,
      }));
    });

    socket.on('game-word-changed', (gameWord) => {
      setGameWord(gameWord);
    });

    socket.on('player-left-game', ({ playerId, playerTurnId, turnState }) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
      setPlayerTurnId(playerTurnId);
      setTurnState(turnState);
      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { playerIds: playerId, message: ' left the game.' },
      ]);
    });

    socket.on('player-game-ready-changed', ({ playerId, isGameReady }) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId ? { ...player, isGameReady } : player
        )
      );
    });

    socket.on('game-reset', () => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        letterCount: 0,
        cards: undefined,
        roundScore: undefined,
        isGameReady: false,
        isRoundReady: false,
      }));
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          letterCount: 0,
          cards: undefined,
          roundScore: undefined,
          isGameReady: false,
          isRoundReady: false,
        }))
      );
      setGameState('not_started');
      setRoundState('not_started');
      setTurnState('not_started');
      setPlayerTurnId(undefined);
      setDrawPileCardCount(0);
      setDiscardPile([]);
      setTakenCard(undefined);
      setGolfCallerId(undefined);
      setGameWinnerId(undefined);
      setRoundLoserIds(undefined);
    });

    socket.on('round-reset', () => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        cards: undefined,
        isRoundReady: false,
        roundScore: undefined,
      }));
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          cards: undefined,
          isRoundReady: false,
          roundScore: undefined,
        }))
      );
      setDiscardPile([]);
      setDrawPileCardCount(0);
      setRoundLoserIds([]);
      setRoundState('not_started');
      setGolfCallerId(undefined);
    });

    socket.on('player-round-ready-changed', ({ playerId, isRoundReady }) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId ? { ...player, isRoundReady } : player
        )
      );
    });

    socket.on(
      'round-started',
      ({ discardPileTop, drawPileCardCount, playerTurnId }) => {
        setDiscardPile([discardPileTop]);
        setDrawPileCardCount(drawPileCardCount);
        setPlayerTurnId(playerTurnId);
        setRoundState('started');
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          cards: prevPlayer.cards
            ? ['facedown', 'facedown', 'facedown', 'facedown']
            : undefined,
        }));

        setGameLog((prevGameLog) => [
          ...prevGameLog,
          { message: 'Round started.' },
          { playerIds: playerTurnId, message: `'s turn.` },
        ]);
      }
    );

    socket.on('discard-pile-taken', (playerId) => {
      setDiscardPile((prevPile) => [...prevPile.slice(0, -1)]);
      setTurnState('card_taken');

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        {
          playerIds: playerId,
          message: ' took a card from the discard pile.',
        },
      ]);
    });

    socket.on('draw-pile-taken', (playerId) => {
      setDrawPileCardCount((prevCount) => prevCount - 1);
      setTurnState('card_taken');

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        {
          playerIds: playerId,
          message: ' took a card from the draw pile.',
        },
      ]);
    });

    socket.on('card-discarded', ({ playerId, discardedCard }) => {
      setDiscardPile((prevPile) => [...prevPile, discardedCard]);
      setTurnState('card_discarded');

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        { playerIds: playerId, message: ' discarded their card.' },
      ]);
    });

    socket.on('card-swapped', ({ playerId, discardedCard, swapCardIdx }) => {
      setDiscardPile((prevPile) => [...prevPile, discardedCard]);
      setTurnState('card_discarded');

      setGameLog((prevGameLog) => [
        ...prevGameLog,
        {
          playerIds: playerId,
          message: ` swapped out their ${swapCardIdx < 2 ? 'top' : 'bottom'} ${
            swapCardIdx % 2 ? 'right' : 'left'
          } card.`,
        },
      ]);
    });

    socket.on('turn-finished', (playerTurnId) => {
      setPlayerTurnId(playerTurnId);
      setTurnState('not_started');

      if (playerTurnId) {
        setGameLog((prevGameLog) => [
          ...prevGameLog,
          {
            playerIds: playerTurnId,
            message: `'s turn.`,
          },
        ]);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('golf-called', (golfCallerId) => {
      setGolfCallerId(golfCallerId);
      setGameLog((prevGameLog) => [
        ...prevGameLog,
        {
          playerIds: golfCallerId,
          message: ` called ${gameWord}.`,
        },
      ]);
    });

    const clearListeners = () => {
      socket.removeAllListeners('golf-called');
    };

    return clearListeners;
  }, [socket, gameWord]);

  useEffect(() => {
    socket.on('round-finished', ({ roundLoserIds, players, gameWinnerId }) => {
      setRoundState('finished');
      setGameLog((prevGameLog) => [...prevGameLog, { message: 'Round over.' }]);

      if (roundLoserIds.length > 0) {
        setRoundLoserIds(roundLoserIds);
        setGameLog((prevGameLog) => [
          ...prevGameLog,
          {
            playerIds: roundLoserIds,
            message: ' got a letter.',
          },
        ]);
      }

      if (userId in players) {
        setPlayer(players[userId]);
      }

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id in players ? players[player.id] : player
        )
      );

      if (gameWinnerId) {
        setGameWinnerId(gameWinnerId);
        setGameState('finished');
        setGameLog((prevGameLog) => [
          ...prevGameLog,
          { playerIds: gameWinnerId, message: ' won the game!' },
          { message: 'Game over.' },
        ]);
      }
    });
  }, [socket, userId]);

  const dealNewRound = useCallback(() => {
    socket.emit('deal-new-round', gameId);
  }, [socket, gameId]);

  const resetGame = useCallback(() => {
    socket.emit('reset-game', gameId);
  }, [socket, gameId]);

  const changeName = useCallback(
    (username: string) => {
      setPlayer((prevPlayer) => ({ ...prevPlayer, name: username }));
      setPlayerNames((prevPlayerNames) => ({
        ...prevPlayerNames,
        [userId]: username,
      }));

      socket.emit('change-name', gameId, username);
    },
    [socket, gameId, userId]
  );

  const changeGameWord = useCallback(
    (gameWord: string) => {
      socket.emit('change-game-word', gameId, gameWord);
    },
    [socket, gameId]
  );

  const kickPlayer = useCallback(
    (playerId: string) => {
      socket.emit('kick-player', gameId, playerId);
    },
    [socket, gameId]
  );

  const toggleGameReady = useCallback(() => {
    socket.emit('toggle-game-ready', gameId, (isGameReady) => {
      setPlayer((prevPlayer) => ({ ...prevPlayer, isGameReady }));
    });
  }, [socket, gameId]);

  const toggleRoundReady = useCallback(() => {
    if (socket == null) return;
    socket.emit('toggle-round-ready', gameId, (isRoundReady) => {
      setPlayer((prevPlayer) => ({ ...prevPlayer, isRoundReady }));
    });
  }, [socket, gameId]);

  const takeFromDiscardPile = useCallback(() => {
    setTakenCard(discardPile[discardPile.length - 1]);
    socket.emit('take-discard-pile', gameId);
  }, [discardPile, socket, gameId]);

  const takeFromDrawPile = useCallback(() => {
    socket.emit('take-draw-pile', gameId, (card) => {
      setTakenCard(card);
    });
  }, [socket, gameId]);

  const swapCard = useCallback(
    (swapCardIdx: number) => {
      return () => {
        socket.emit('swap-card', gameId, swapCardIdx);
        setTakenCard(undefined);

        if (golfCallerId) {
          socket.emit('finish-turn', gameId);
        }
      };
    },
    [socket, gameId, golfCallerId]
  );

  const discardCard = useCallback(() => {
    socket.emit('discard-card', gameId);
    setTakenCard(undefined);

    if (golfCallerId) {
      socket.emit('finish-turn', gameId);
    }
  }, [socket, gameId, golfCallerId]);

  const startGame = useCallback(() => {
    socket.emit('start-game', gameId);
  }, [socket, gameId]);

  const finishTurn = useCallback(() => {
    socket.emit('finish-turn', gameId);
  }, [socket, gameId]);

  const callGolf = useCallback(() => {
    socket.emit('call-golf', gameId);
  }, [socket, gameId]);

  const getPlayerBadgeStatus = useCallback(
    (
      playerId: string,
      isEliminated: boolean,
      isRoundReady: boolean
    ): Status | undefined => {
      if (roundLoserIds && roundLoserIds.includes(playerId)) {
        return {
          message: 'Loser',
          statusType: 'error',
        };
      }

      if (isEliminated) {
        return undefined;
      }

      if (roundState === 'cards_dealt') {
        return {
          message: `${isRoundReady ? '' : 'Not '}Ready`,
          statusType: isRoundReady ? 'success' : 'warning',
        };
      }

      if (roundState === 'started' && playerId === golfCallerId) {
        return {
          message: `${gameWord} Called!`,
          statusType: 'warning',
        };
      }

      if (playerId === gameWinnerId) {
        return {
          message: 'Winner',
          statusType: 'success',
        };
      }

      return undefined;
    },
    [roundState, roundLoserIds, golfCallerId, gameWord, gameWinnerId]
  );

  const getPlayerResultStatus = useCallback(
    (playerId: string, isEliminated: boolean): Status => {
      if (playerId === gameWinnerId) {
        return {
          message: 'Winner',
          statusType: 'success',
        };
      }

      if (!roundLoserIds) {
        return {
          message: 'Tie',
          statusType: 'default',
        };
      }

      if (!roundLoserIds.includes(playerId)) {
        return {
          message: 'Safe',
          statusType: 'default',
        };
      }

      if (isEliminated) {
        return {
          message: 'Eliminated',
          statusType: 'error',
        };
      }

      return {
        message: 'Loser',
        statusType: 'error',
      };
    },
    [roundLoserIds, gameWinnerId]
  );

  return {
    player,
    players,
    playerNames,
    gameWord,
    playerTurnId,
    gameState,
    roundState,
    turnState,
    discardPile,
    drawPileCardCount,
    takenCard,
    gameLog,
    changeName,
    changeGameWord,
    kickPlayer,
    toggleGameReady,
    toggleRoundReady,
    startGame,
    resetGame,
    dealNewRound,
    takeFromDiscardPile,
    takeFromDrawPile,
    swapCard,
    discardCard,
    finishTurn,
    callGolf,
    getPlayerBadgeStatus,
    getPlayerResultStatus,
  };
};

export { useGame };
