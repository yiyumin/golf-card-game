import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import { DownButton, UpButton } from './buttons';
import { GameLogEntry as Entry } from '../hooks/useGame';
import GameLogEntry from './GameLogEntry';

type GameLogProps = {
  gameLog: Entry[];
  playerNames: { [key: string]: string };
};

const GameLog = ({ gameLog, playerNames }: GameLogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    endRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [isOpen, gameLog]);

  return (
    <motion.div
      className='fixed bottom-0 flex w-full justify-center lg:w-1/3'
      animate={{
        translateY: isOpen ? '0rem' : '10rem',
        transition: { type: 'spring', bounce: 0 },
      }}
    >
      <div className='flex h-52 w-5/6 flex-col rounded-t-xl bg-black/80 p-3 text-white'>
        <button
          className='group flex h-10 justify-center'
          onClick={() => setIsOpen((currState) => !currState)}
        >
          {isOpen ? <DownButton /> : <UpButton />}
        </button>
        <div className='flex h-[calc(100%-2.5rem)] flex-col justify-end'>
          <div className='overflow-auto'>
            {gameLog.map((entry, idx) => (
              <GameLogEntry
                key={idx}
                gameLogEntry={entry}
                playerNames={playerNames}
              />
            ))}

            <div ref={endRef} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameLog;
