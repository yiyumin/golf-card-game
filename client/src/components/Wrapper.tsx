import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
import { useWindowSize } from '../hooks/useWindowSize';

import { HelpButton } from './buttons';
import { RulesModal } from './modals';
import ErrorModal from './modals/ErrorModal';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { height } = useWindowSize();

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    socket.on('error', (errorType) => {
      if (errorType === 'game_not_found') {
        navigate('/');
        setErrorMessage('Game not found');
      } else if (errorType === 'not_player_turn') {
        setErrorMessage('It is not your turn!');
      }
    });
  }, [socket, navigate]);

  return (
    <div className='w-screen bg-golf-green-500' style={{ height: height }}>
      {children}

      <div className='absolute top-5 right-5 md:top-8 md:right-8 lg:top-12 lg:right-16'>
        <HelpButton onClick={() => setIsRulesModalOpen(true)} />
      </div>

      <RulesModal
        isOpen={isRulesModalOpen}
        handleClose={() => setIsRulesModalOpen(false)}
      />

      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage(undefined)}
      />
    </div>
  );
};

export default Wrapper;
