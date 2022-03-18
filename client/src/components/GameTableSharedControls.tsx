import { GameButton } from './buttons';

type GameTableSharedControlsProps = {
  isGameOver: boolean;
  isEliminated: boolean;
  resetGame: () => void;
  dealNewRound: () => void;
  showResult: () => void;
};

const GameTableSharedControls = ({
  isGameOver,
  isEliminated,
  resetGame,
  dealNewRound,
  showResult,
}: GameTableSharedControlsProps) => (
  <div className='absolute top-0 left-0 flex h-full w-full flex-col items-center justify-around bg-black/75'>
    {isGameOver ? (
      <GameButton onClick={resetGame}>New Game</GameButton>
    ) : (
      !isEliminated && <GameButton onClick={dealNewRound}>New Round</GameButton>
    )}

    <GameButton onClick={showResult}>View Results</GameButton>
  </div>
);

export default GameTableSharedControls;
