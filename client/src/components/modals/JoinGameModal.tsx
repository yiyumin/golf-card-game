import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../util/Modal';
import { NavigationButton } from '../buttons';

type JoinGameModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const JoinGameModal = ({ isOpen, handleClose }: JoinGameModalProps) => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/${gameId.slice(-5)}`);
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <form
        className='flex h-full flex-col items-center justify-center gap-12'
        onSubmit={onSubmit}
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <label htmlFor='game-code' className='text-2xl font-bold uppercase'>
            Enter game code:
          </label>
          <input
            type='text'
            id='game-code'
            className='h-16 w-64 rounded-lg'
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            autoFocus
            required
          />
        </div>
        <NavigationButton type='submit'>Join</NavigationButton>
      </form>
    </Modal>
  );
};

export default JoinGameModal;
