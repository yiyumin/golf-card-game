import { motion, AnimatePresence } from 'framer-motion';

import {
  Card as CardType,
  PlayerWithPlayerCards,
  RoundState,
  TurnState,
} from '@yiyumin/golf-game-library/types';

import { ReactComponent as CheckIcon } from '../icons/check.svg';

import Card from './Card';
import PlayerBadge from './PlayerBadge';
import GameTableMainPlayerCards from './GameTableMainPlayerCards';
import { GameButton } from './buttons';
import { Status } from '../types';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: '1',
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      duration: '1',
    },
  },
};

type GameTableMainPlayerProps = {
  player: PlayerWithPlayerCards;
  roundState: RoundState;
  turnState: TurnState;
  gameWord: string;
  takenCard?: CardType;
  isPlayerTurn: boolean;
  isEliminated: boolean;
  status?: Status;
  toggleRoundReady: () => void;
  swapCard: (idx: number) => () => void;
  finishTurn: () => void;
  callGolf: () => void;
  openChangeNameModal: () => void;
};

const GameTableMainPlayer = ({
  player: {
    id,
    name,
    letterCount,
    isRoundReady,
    isConnected,
    cards,
    roundScore,
  },
  roundState,
  turnState,
  gameWord,
  takenCard,
  isPlayerTurn,
  isEliminated,
  status,
  toggleRoundReady,
  swapCard,
  finishTurn,
  callGolf,
  openChangeNameModal,
}: GameTableMainPlayerProps) => (
  <div className='relative h-full'>
    <div
      className={`pointer-events-none absolute h-full w-full rounded-2xl border-sky-blue-500 ${
        roundState === 'started' && isPlayerTurn
          ? 'animate-pulse-full border-4'
          : 'border-0'
      }`}
    />

    <div
      className={`h-full rounded-2xl bg-fairway-green-500 py-3 text-white lg:p-5 ${
        isEliminated ? 'opacity-50' : ''
      }`}
    >
      <div className='mx-auto flex h-full flex-col lg:w-3/4'>
        <div className='flex h-3/10 max-h-24 justify-center'>
          <PlayerBadge
            id={id}
            name={name}
            isSelf={true}
            status={status}
            isConnected={isConnected}
            openChangeNameModal={openChangeNameModal}
          />
        </div>

        <div className='h-1/10 text-center text-xl font-black tracking-xl'>
          {gameWord.slice(0, letterCount)}
        </div>

        <div className='grid h-1/2 grid-cols-2'>
          <div className='flex items-center justify-center'>
            <GameTableMainPlayerCards
              cards={cards}
              clickable={isPlayerTurn && turnState === 'card_taken'}
              isHidden={roundState === 'cards_dealt' && isRoundReady}
              onClick={swapCard}
            />
          </div>
          <div className='flex items-center justify-center'>
            <AnimatePresence>
              {turnState === 'card_taken' && isPlayerTurn && (
                <motion.div
                  variants={dropIn}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <Card
                    card={takenCard || 'facedown'}
                    clickable={false}
                    cardType='main-player'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className='h-1/10'>
          {roundState === 'cards_dealt' && !isEliminated && (
            <div
              className='group flex justify-center gap-x-10 hover:cursor-pointer'
              onClick={toggleRoundReady}
            >
              <div className='flex h-7 w-7 items-center justify-center rounded-md border-4 border-black bg-sandtrap-white-100 group-hover:bg-sandtrap-white-500 md:h-9 md:w-9'>
                {isRoundReady && (
                  <CheckIcon
                    width='100%'
                    height='100%'
                    className='fill-green-400 group-hover:fill-green-600 group-hover:drop-shadow-sm'
                  />
                )}
              </div>
              <span className='flex items-center text-xl font-bold md:text-3xl'>
                I'm Ready
              </span>
            </div>
          )}

          {isPlayerTurn && turnState === 'card_discarded' && (
            <div className='flex justify-evenly'>
              <GameButton onClick={finishTurn}>Finish Turn</GameButton>
              <GameButton onClick={callGolf}>Call {gameWord}</GameButton>
            </div>
          )}

          {roundScore && (
            <div className='text-center uppercase'>Score: {roundScore}</div>
          )}
        </div>
      </div>
    </div>

    {isEliminated && (
      <div className='absolute inset-0 m-auto h-fit w-fit -rotate-22.5 text-3xl font-black uppercase text-flag-red-500 md:text-5xl'>
        Eliminated
      </div>
    )}
  </div>
);

export default GameTableMainPlayer;
