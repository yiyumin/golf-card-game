import { FormEvent, useState } from 'react';

import Modal from '../util/Modal';
import { Button } from '../buttons';

type ChangeNameModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  name: string;
  changeName: (name: string) => void;
};

const ChangeNameModal = ({
  isOpen,
  handleClose,
  name,
  changeName,
}: ChangeNameModalProps) => {
  const [tempName, setTempName] = useState(name);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    changeName(tempName);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <form
        className='flex h-full flex-col items-center justify-center gap-12'
        onSubmit={onSubmit}
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <label htmlFor='new-name' className='text-2xl font-normal'>
            Change your username to:
          </label>
          <input
            type='text'
            id='new-name'
            className='h-16 w-64 rounded-lg'
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
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

export default ChangeNameModal;
