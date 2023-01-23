import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';
import { useState } from 'react';

import { useSocket } from '../contexts/SocketProvider';

import { NavigationButton } from './buttons';

import { JoinGameModal } from './modals';
import Tooltip from './util/Tooltip';

const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(false);
  const [isCreateGameButtonHovered, setIsCreateGameButtonHovered] =
    useState(false);

  const createGame = useCallback(() => {
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
            onMouseOver={() => setIsCreateGameButtonHovered(true)}
            onMouseLeave={() => setIsCreateGameButtonHovered(false)}
          >
            Create Game
            <Tooltip
              text='Initial game creation may take up to a minute...'
              visible={isCreateGameButtonHovered}
            />
          </NavigationButton>
          <NavigationButton onClick={() => setIsJoinGameModalOpen(true)}>
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
