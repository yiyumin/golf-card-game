import { EditButton } from './buttons';

type GameLobbySettingsGameWordProps = {
  gameWord: string;
  openChangeGameWordModal: () => void;
};

const GameLobbySettingsGameWord = ({
  gameWord,
  openChangeGameWordModal,
}: GameLobbySettingsGameWordProps) => {
  return (
    <div className='text-center text-2xl uppercase tracking-2xl md:text-4xl md:tracking-4xl lg:text-2xl lg:tracking-2xl'>
      <span>{gameWord}</span>
      <div className='inline-block w-5'>
        <EditButton onClick={openChangeGameWordModal} />
      </div>
    </div>
  );
};

export default GameLobbySettingsGameWord;
