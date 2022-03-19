import { useState, useEffect, useMemo } from 'react';

import {
  Card,
  GameState,
  PlayerWithPlayerCards,
  RoundState,
  TurnState,
} from '@yiyumin/golf-card-game-library/types';
import { Status } from '../types';

import GameTablePlayers from './GameTablePlayers';
import GameTableMainPlayer from './GameTableMainPlayer';
import GameTableShared from './GameTableShared';

import BackNavigation from './BackNavigation';

import { LeaveGameModal, ResultModal } from './modals';

type GameTableProps = {
  player: PlayerWithPlayerCards;
  players: PlayerWithPlayerCards[];
  gameWord: string;
  playerTurnId?: string;
  gameState: GameState;
  roundState: RoundState;
  turnState: TurnState;
  discardPile: Card[];
  drawPileCardCount: number;
  takenCard?: Card;
  toggleRoundReady: () => void;
  takeFromDiscardPile: () => void;
  takeFromDrawPile: () => void;
  discardCard: () => void;
  swapCard: (idx: number) => () => void;
  finishTurn: () => void;
  callGolf: () => void;
  dealNewRound: () => void;
  resetGame: () => void;
  getPlayerBadgeStatus: (
    playerId: string,
    isEliminated: boolean,
    isRoundReady: boolean
  ) => Status | undefined;
  getPlayerResultStatus: (playerId: string, isEliminated: boolean) => Status;
  goBack: () => void;
  openChangeNameModal: () => void;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameTable = ({
  player,
  players,
  gameWord,
  playerTurnId,
  gameState,
  roundState,
  turnState,
  discardPile,
  drawPileCardCount,
  takenCard,
  toggleRoundReady,
  takeFromDiscardPile,
  takeFromDrawPile,
  discardCard,
  swapCard,
  finishTurn,
  callGolf,
  dealNewRound,
  resetGame,
  getPlayerBadgeStatus,
  getPlayerResultStatus,
  goBack,
  openChangeNameModal,
  openKickPlayerModal,
}: GameTableProps) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isLeaveGameModalOpen, setIsLeaveGameModalOpen] = useState(false);

  const isEliminated = useMemo(
    () => player.letterCount >= gameWord.length,
    [player.letterCount, gameWord.length]
  );

  useEffect(() => {
    if (roundState === 'finished') {
      setIsResultModalOpen(true);
    } else {
      setIsResultModalOpen(false);
    }
  }, [roundState]);

  return (
    <>
      <div className='flex h-full flex-col items-center justify-around space-y-4 p-10'>
        <div className='h-1/5 w-full overflow-auto lg:w-2/3'>
          <GameTableShared
            discardPileTopCard={discardPile[discardPile.length - 1]}
            drawPileCardCount={drawPileCardCount}
            gameState={gameState}
            roundState={roundState}
            turnState={turnState}
            isPlayerTurn={player.id === playerTurnId}
            isEliminated={isEliminated}
            discardCard={discardCard}
            takeFromDiscardPile={takeFromDiscardPile}
            takeFromDrawPile={takeFromDrawPile}
            resetGame={resetGame}
            dealNewRound={dealNewRound}
            showResult={() => setIsResultModalOpen(true)}
          />
        </div>

        <div className='h-1/5 w-full overflow-auto lg:w-2/3'>
          <GameTablePlayers
            players={players}
            playerTurnId={playerTurnId}
            roundState={roundState}
            turnState={turnState}
            gameWord={gameWord}
            getPlayerBadgeStatus={getPlayerBadgeStatus}
            openKickPlayerModal={openKickPlayerModal}
          />
        </div>

        <div className='h-1/2 w-full overflow-auto lg:w-2/3'>
          <GameTableMainPlayer
            player={player}
            roundState={roundState}
            turnState={turnState}
            gameWord={gameWord}
            takenCard={takenCard}
            isPlayerTurn={player.id === playerTurnId}
            isEliminated={isEliminated}
            status={getPlayerBadgeStatus(
              player.id,
              isEliminated,
              player.isRoundReady
            )}
            toggleRoundReady={toggleRoundReady}
            swapCard={swapCard}
            finishTurn={finishTurn}
            callGolf={callGolf}
            openChangeNameModal={openChangeNameModal}
          />
        </div>
      </div>

      <BackNavigation onClick={() => setIsLeaveGameModalOpen(true)} />
      <LeaveGameModal
        isOpen={isLeaveGameModalOpen}
        handleClose={() => setIsLeaveGameModalOpen(false)}
        goBack={goBack}
      />
      <ResultModal
        isOpen={isResultModalOpen}
        handleClose={() => setIsResultModalOpen(false)}
        player={player}
        players={players}
        isEliminated={isEliminated}
        gameState={gameState}
        gameWord={gameWord}
        getPlayerResultStatus={getPlayerResultStatus}
      />
    </>
  );
};

export default GameTable;
