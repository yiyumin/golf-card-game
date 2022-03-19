import {
  GameState,
  PlayerWithPlayerCards,
} from '@yiyumin/golf-card-game-library/types';
import { Status } from '../../types';
import PlayerStatus from '../PlayerStatus';

import Modal from '../util/Modal';

type ResultModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  player: PlayerWithPlayerCards;
  players: PlayerWithPlayerCards[];
  isEliminated: boolean;
  gameState: GameState;
  gameWord: string;
  getPlayerResultStatus: (playerId: string, isEliminated: boolean) => Status;
};

const ResultModal = ({
  isOpen,
  handleClose,
  player,
  players,
  isEliminated,
  gameState,
  gameWord,
  getPlayerResultStatus,
}: ResultModalProps) => {
  const playerStatus = getPlayerResultStatus(player.id, isEliminated);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className='flex h-full w-full flex-col items-center gap-4 p-5'>
        <h2 className='text-2xl font-bold uppercase'>
          {gameState === 'finished' ? 'Game' : 'Round'} Over
        </h2>
        <table className='w-full table-fixed text-left'>
          <thead className='text-sm'>
            <tr>
              <th className='w-1/3'>Player</th>
              <th>Score</th>
              <th>Result</th>
              <th>Letters</th>
            </tr>
          </thead>
          <tbody>
            {players
              .filter((player) => player.roundScore)
              .map(({ id, name, roundScore, letterCount }, idx) => {
                const status = getPlayerResultStatus(
                  id,
                  letterCount >= gameWord.length
                );

                return (
                  <tr key={idx}>
                    <td
                      className={`overflow-hidden overflow-ellipsis whitespace-nowrap ${
                        letterCount >= gameWord.length
                          ? 'text-flag-red-500 line-through'
                          : ''
                      }`}
                      title={name}
                    >
                      {name}
                    </td>
                    <td>{roundScore}</td>
                    <td
                      className='overflow-hidden overflow-ellipsis'
                      title={status.message}
                    >
                      <PlayerStatus status={status} />
                    </td>
                    <td
                      className='overflow-hidden overflow-ellipsis'
                      title={gameWord.slice(0, letterCount)}
                    >
                      {gameWord.slice(0, letterCount)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {player.roundScore && (
          <div className='flex h-full flex-col items-center justify-center'>
            <div className='text-3xl font-black uppercase'>
              <PlayerStatus status={playerStatus} />
            </div>

            <div className='text-2xl'>Score: {player.roundScore}</div>
            <div className='-mr-[1.875rem] text-3xl font-black tracking-3xl'>
              <span className='text-flag-red-500'>
                {gameWord.slice(0, player.letterCount)}
              </span>
              <span className='text-shadow-md text-transparent'>
                {gameWord.slice(player.letterCount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResultModal;
