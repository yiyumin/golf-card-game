import { useState } from 'react';

import { Button } from './buttons';

const url = process.env.PUBLIC_URL as string;

type GameLobbySettingsInviteProps = {
  gameId: string;
};

const GameLobbySettingsInvite = ({ gameId }: GameLobbySettingsInviteProps) => {
  const [copyClicked, setCopyClicked] = useState(false);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(`${url}/#/${gameId}`);
    setCopyClicked(true);
  };

  return (
    <>
      <div className='flex w-1/2 flex-col items-center gap-1'>
        <label htmlFor='game-url' className='block text-base md:text-2xl'>
          Invite Friends!
        </label>
        <input
          type='text'
          id='game-url'
          className='w-full overflow-auto rounded-md p-1 text-xs text-black lg:text-base'
          value={`${url}/#/${gameId}`}
          onFocus={(e) => e.target.select()}
          readOnly
        />
      </div>
      <Button onClick={copyUrlToClipboard}>
        {copyClicked ? 'Link Copied!' : 'Copy'}
      </Button>
    </>
  );
};

export default GameLobbySettingsInvite;
