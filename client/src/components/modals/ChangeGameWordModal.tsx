import { FormEvent, useState } from 'react';

import Modal from '../util/Modal';
import { Button } from '../buttons';

type ChangeGameWordModalProps = {
  gameWord: string;
  isOpen: boolean;
  handleClose: () => void;
  changeGameWord: (gameWord: string) => void;
};

const ChangeGameWordModal = ({
  gameWord,
  isOpen,
  handleClose,
  changeGameWord,
}: ChangeGameWordModalProps) => {
  const [tempGameWord, setTempGameWord] = useState(gameWord);

  const onWordChange = (word: string) => {
    if (/^\w{0,10}$/.test(word)) {
      setTempGameWord(word);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    changeGameWord(tempGameWord.toUpperCase());
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <form
        className='flex h-full flex-col items-center justify-center gap-12'
        onSubmit={onSubmit}
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <label htmlFor='new-game-word' className='text-2xl font-normal'>
            Change game word to:
          </label>
          <input
            type='text'
            id='new-game-word'
            className='h-16 w-64 rounded-lg uppercase'
            value={tempGameWord}
            onChange={(e) => onWordChange(e.target.value)}
            autoFocus
            onFocus={(e) => e.target.select()}
            required
          />
        </div>
        <Button type='submit'>Change</Button>
      </form>
    </Modal>
  );
};

export default ChangeGameWordModal;
