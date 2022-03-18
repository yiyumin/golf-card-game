import GameLobbySettingsInvite from './GameLobbySettingsInvite';
import GameLobbySettingsGameWord from './GameLobbySettingsGameWord';
import GameLobbySettingsReady from './GameLobbySettingsReady';
import { NavigationButton } from './buttons';

type GameLobbySettingsProps = {
  gameId: string;
  gameWord: string;
  isGameReady: boolean;
  isGameStartable: boolean;
  openChangeGameWordModal: () => void;
  startGame: () => void;
  toggleGameReady: () => void;
};

const GameLobbySettings = ({
  gameId,
  gameWord,
  isGameReady,
  isGameStartable,
  openChangeGameWordModal,
  startGame,
  toggleGameReady,
}: GameLobbySettingsProps) => {
  return (
    <div className='flex h-3/6 w-5/6 flex-col items-center gap-y-5 rounded-large bg-fairway-green-500 py-5 text-lg text-white md:text-2xl lg:h-2/3 lg:w-2/6 lg:py-10'>
      <h3 className='font-bold uppercase'>Game Settings</h3>
      <div className='flex h-full w-4/5 flex-col justify-between gap-2'>
        <div className='flex h-1/4 items-center justify-around overflow-auto rounded-small bg-black/35 p-2 lg:p-5'>
          <GameLobbySettingsInvite gameId={gameId} />
        </div>

        <div className='flex h-1/4 flex-col justify-center space-y-5 overflow-auto rounded-small bg-black/35 p-2 lg:p-5'>
          <GameLobbySettingsGameWord
            gameWord={gameWord}
            openChangeGameWordModal={openChangeGameWordModal}
          />
        </div>

        <div className='flex h-1/4 items-center justify-center overflow-auto rounded-small bg-black/35 p-2 lg:p-5'>
          <GameLobbySettingsReady
            isGameReady={isGameReady}
            toggleGameReady={toggleGameReady}
          />
        </div>
        <div className='flex h-1/4 items-center justify-center'>
          <NavigationButton
            buttonSize='small'
            disabled={!isGameStartable}
            onClick={startGame}
          >
            Start
          </NavigationButton>
        </div>
      </div>
    </div>
  );
};

export default GameLobbySettings;
