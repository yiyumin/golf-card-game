import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from './Backdrop';
import { XButton } from '../buttons';

const dropIn = {
  hidden: {
    opacity: 0,
    scale: 1.2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 60,
      mass: 1,
      delay: 0,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
  },
};

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

const Modal = ({ isOpen, children, handleClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='relative h-2/3 w-11/12 overflow-hidden rounded-large bg-sandtrap-white-500 md:w-3/5 lg:w-2/5 lg:p-5'
          >
            <div className='absolute top-5 right-[5%] w-6'>
              <XButton onClick={handleClose} />
            </div>

            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
