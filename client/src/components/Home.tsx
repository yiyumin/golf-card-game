import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';
import { useState } from 'react';

import { useSocket } from '../contexts/SocketProvider';

import { NavigationButton } from './buttons';

import { JoinGameModal } from './modals';
import Spinner from './util/Spinner';
import Tooltip from './util/Tooltip';

const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(false);
  const [isCreateGameButtonHovered, setIsCreateGameButtonHovered] =
    useState(false);
  const [isGameInitializing, setIsGameInitializing] = useState(false);

  const createGame = useCallback(() => {
    setIsGameInitializing(true);
    socket?.emit('create-game', (gameId: string) => {
      navigate(`/${gameId}`);
    });
  }, [navigate, socket]);

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex h-2/3 w-3/4 items-center rounded-large bg-fairway-green-500 md:h-1/2 md:w-2/3'>
        <div className='flex h-full w-full flex-col items-center justify-evenly lg:h-auto lg:flex-row'>
          <NavigationButton
            onClick={createGame}
            disabled={isGameInitializing}
            onMouseOver={() => setIsCreateGameButtonHovered(true)}
            onMouseLeave={() => setIsCreateGameButtonHovered(false)}
          >
            {isGameInitializing ? (
              <span className='flex items-center justify-center gap-2'>
                <Spinner /> Initializing Game...
              </span>
            ) : (
              <span>Create Game</span>
            )}

            <Tooltip
              text='Initial game creation may take up to a minute...'
              visible={isCreateGameButtonHovered}
            />
          </NavigationButton>
          <NavigationButton
            onClick={() => setIsJoinGameModalOpen(true)}
            disabled={isGameInitializing}
          >
            Join Game
          </NavigationButton>
        </div>
      </div>

      <JoinGameModal
        isOpen={isJoinGameModalOpen}
        handleClose={() => setIsJoinGameModalOpen(false)}
      />
    </div>
  );
};

export default Home;
