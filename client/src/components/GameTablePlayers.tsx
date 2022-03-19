import { useMemo, useEffect, createRef } from 'react';

import {
  PlayerWithPlayerCards,
  RoundState,
  TurnState,
} from '@yiyumin/golf-game-library/types';

import { Status } from '../types';

import GameTablePlayer from './GameTablePlayer';

type GameTablePlayersProps = {
  players: PlayerWithPlayerCards[];
  playerTurnId?: string;
  roundState: RoundState;
  turnState: TurnState;
  gameWord: string;
  getPlayerBadgeStatus: (
    playerId: string,
    isEliminated: boolean,
    isRoundReady: boolean
  ) => Status | undefined;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameTablePlayers = ({
  players,
  playerTurnId,
  roundState,
  turnState,
  gameWord,
  getPlayerBadgeStatus,
  openKickPlayerModal,
}: GameTablePlayersProps) => {
  const playerRefs = useMemo(
    () =>
      players.reduce(
        (refs, { id }) => ({ ...refs, [id]: createRef<HTMLDivElement>() }),
        {} as { [key: string]: React.RefObject<HTMLDivElement> }
      ),
    [players]
  );

  useEffect(() => {
    if (playerTurnId && playerRefs[playerTurnId]) {
      setTimeout(() => {
        playerRefs[playerTurnId].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 1500);
    }
  }, [playerRefs, playerTurnId]);

  return (
    <div className='h-full snap-y snap-mandatory space-y-4 overflow-auto md:grid md:auto-rows-[100%] md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3'>
      {players.map((player, idx) => {
        const isEliminated = player.letterCount >= gameWord.length;

        return (
          <div
            key={idx}
            ref={playerRefs[player.id]}
            className='h-full snap-start'
          >
            <GameTablePlayer
              player={player}
              isPlayerTurn={player.id === playerTurnId}
              isEliminated={isEliminated}
              status={getPlayerBadgeStatus(
                player.id,
                isEliminated,
                player.isRoundReady
              )}
              roundState={roundState}
              gameWord={gameWord}
              turnState={turnState}
              openKickPlayerModal={openKickPlayerModal}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GameTablePlayers;
