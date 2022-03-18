import Modal from '../util/Modal';
import { NavigationButton } from '../buttons';

type LeaveGameModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  goBack: () => void;
};

const LeaveGameModal = ({
  isOpen,
  handleClose,
  goBack,
}: LeaveGameModalProps) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className='flex h-full flex-col items-center justify-center gap-12'>
        <div className='text-center text-2xl'>
          Are you sure you want to leave this game?
        </div>
        <NavigationButton onClick={goBack}>Leave</NavigationButton>
      </div>
    </Modal>
  );
};

export default LeaveGameModal;
