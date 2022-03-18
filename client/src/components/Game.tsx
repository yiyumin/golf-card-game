import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useSocket } from '../contexts/SocketProvider';
import { useGame } from '../hooks/useGame';

import GameTable from './GameTable';
import GameLobby from './GameLobby';

import { ChangeNameModal, KickPlayerModal } from './modals';
import GameLog from './GameLog';

type PlayerCore = {
  id: string;
  name: string;
};

type GameParams = {
  gameId: string;
};

const Game = () => {
  const { gameId } = useParams() as GameParams;
  const navigate = useNavigate();

  const { socket, userId } = useSocket();

  const [isChangeNameModalOpen, setIsChangeNameModalOpen] = useState(false);
  const [playerToKick, setPlayerToKick] = useState<PlayerCore>();

  const {
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
  } = useGame(socket, userId, gameId);

  const goBack = useCallback(() => {
    kickPlayer(userId);
    navigate('/');
  }, [kickPlayer, userId, navigate]);

  return (
    <div className='relative h-full w-full overflow-clip'>
      {gameState === 'not_started' ? (
        <GameLobby
          gameId={gameId}
          player={player}
          players={players}
          gameWord={gameWord}
          changeGameWord={changeGameWord}
          toggleGameReady={toggleGameReady}
          startGame={startGame}
          goBack={goBack}
          openChangeNameModal={() => setIsChangeNameModalOpen(true)}
          openKickPlayerModal={setPlayerToKick}
        />
      ) : (
        <GameTable
          player={player}
          players={players}
          gameWord={gameWord}
          playerTurnId={playerTurnId}
          gameState={gameState}
          roundState={roundState}
          turnState={turnState}
          discardPile={discardPile}
          drawPileCardCount={drawPileCardCount}
          takenCard={takenCard}
          toggleRoundReady={toggleRoundReady}
          takeFromDiscardPile={takeFromDiscardPile}
          takeFromDrawPile={takeFromDrawPile}
          discardCard={discardCard}
          swapCard={swapCard}
          finishTurn={finishTurn}
          callGolf={callGolf}
          dealNewRound={dealNewRound}
          resetGame={resetGame}
          getPlayerBadgeStatus={getPlayerBadgeStatus}
          getPlayerResultStatus={getPlayerResultStatus}
          goBack={goBack}
          openChangeNameModal={() => setIsChangeNameModalOpen(true)}
          openKickPlayerModal={setPlayerToKick}
        />
      )}

      <GameLog gameLog={gameLog} playerNames={playerNames} />

      <ChangeNameModal
        isOpen={isChangeNameModalOpen}
        handleClose={() => setIsChangeNameModalOpen(false)}
        name={player.name}
        changeName={changeName}
      />
      <KickPlayerModal
        playerToKick={playerToKick}
        handleClose={() => setPlayerToKick(undefined)}
        kickPlayer={kickPlayer}
      />
    </div>
  );
};

export default Game;
