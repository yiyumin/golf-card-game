import {
  PlayerWithPlayerCards,
  RoundState,
  TurnState,
} from '../../../lib/types';
import { Status } from '../types';

import Card from './Card';
import GameTablePlayerBadge from './GameTablePlayerBadge';
import GameTablePlayerCards from './GameTablePlayerCards';

type GameTablePlayerProps = {
  player: PlayerWithPlayerCards;
  isPlayerTurn: boolean;
  isEliminated: boolean;
  status?: Status;
  roundState: RoundState;
  turnState: TurnState;
  gameWord: string;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameTablePlayer = ({
  player: { id, name, letterCount, isConnected, cards, roundScore },
  isPlayerTurn,
  isEliminated,
  status,
  roundState,
  turnState,
  gameWord,
  openKickPlayerModal,
}: GameTablePlayerProps) => {
  return (
    <div className='relative h-full'>
      <div
        className={`pointer-events-none absolute h-full w-full rounded-2xl border-sky-blue-500 ${
          roundState === 'started' && isPlayerTurn
            ? 'animate-pulse-full border-4'
            : 'border-0'
        }`}
      />
      <div
        className={`grid h-full grid-cols-2 gap-x-2 rounded-2xl bg-fairway-green-500 p-2 ${
          isEliminated ? 'opacity-50' : ''
        }`}
      >
        <div>
          <div className='h-1/2'>
            <GameTablePlayerBadge
              id={id}
              name={name}
              status={status}
              isConnected={isConnected}
              isKickable={
                !isConnected && (roundState !== 'started' || isPlayerTurn)
              }
              openKickPlayerModal={openKickPlayerModal}
            />
          </div>
          <div className='flex h-1/2 flex-col items-center'>
            <div className='flex h-1/2 items-center justify-center text-sm uppercase text-white'>
              {roundScore && `Score: ${roundScore}`}
            </div>
            <div className='h-1/2 text-lg font-black tracking-lg text-white'>
              {gameWord.slice(0, letterCount)}
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='flex w-2/3 items-center justify-center'>
            <GameTablePlayerCards
              cards={cards}
              isHidden={roundState !== 'finished'}
            />
          </div>
          <div className='flex w-1/3 items-center justify-center'>
            {turnState === 'card_taken' && isPlayerTurn && (
              <Card card={'facedown'} clickable={false} cardType='player' />
            )}
          </div>
        </div>
      </div>

      {isEliminated && (
        <div className='absolute inset-0 m-auto h-fit w-fit -rotate-22.5 text-3xl font-black uppercase text-flag-red-500'>
          Eliminated
        </div>
      )}
    </div>
  );
};

export default GameTablePlayer;
