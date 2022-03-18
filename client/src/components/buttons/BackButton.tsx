import { ReactComponent as ChevronLeftIcon } from '../../icons/chevron-left.svg';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    className='group h-9 w-9 transition-all hover:h-10 hover:w-10 md:h-12 md:w-12 md:hover:h-14 md:hover:w-14'
    onClick={onClick}
  >
    <ChevronLeftIcon
      width='100%'
      height='100%'
      className='fill-sandtrap-white-100 group-hover:fill-sandtrap-white-500 group-hover:drop-shadow-sm'
    />
  </button>
);

export default BackButton;
