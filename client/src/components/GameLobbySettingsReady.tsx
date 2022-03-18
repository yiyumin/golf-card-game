import { ReactComponent as CheckIcon } from '../icons/check.svg';

type GameLobbySettingsReadyProps = {
  isGameReady: boolean;
  toggleGameReady: () => void;
};

const GameLobbySettingsReady = ({
  isGameReady,
  toggleGameReady,
}: GameLobbySettingsReadyProps) => {
  return (
    <div
      className='group flex justify-center gap-x-10 hover:cursor-pointer'
      onClick={toggleGameReady}
    >
      <div className='flex h-8 w-8 items-center justify-center rounded-md border-4 border-black bg-sandtrap-white-100 group-hover:bg-sandtrap-white-500 md:h-12 md:w-12'>
        {isGameReady && (
          <CheckIcon
            width='100%'
            height='100%'
            className='fill-green-400 group-hover:fill-green-600 group-hover:drop-shadow-sm'
          />
        )}
      </div>
      <span className='flex items-center text-2xl font-bold md:text-4xl'>
        I'm Ready
      </span>
    </div>
  );
};

export default GameLobbySettingsReady;
