import Modal from '../util/Modal';

type ErrorModalProps = {
  errorMessage?: string;
  handleClose: () => void;
};

const ErrorModal = ({ errorMessage, handleClose }: ErrorModalProps) => {
  return (
    <Modal isOpen={!!errorMessage} handleClose={handleClose}>
      <div className='flex h-full flex-col items-center justify-center gap-12'>
        <div className='text-center text-2xl'>{errorMessage}</div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
