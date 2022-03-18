import { motion } from 'framer-motion';

type BackdropProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/75'
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
