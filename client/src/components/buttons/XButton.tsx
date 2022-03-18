import { ReactComponent as XIcon } from '../../icons/x.svg';

type XButtonProps = {
  onClick?: () => void;
};

const XButton = ({ onClick }: XButtonProps) => (
  <button className='group' onClick={onClick}>
    <XIcon
      width='100%'
      height='100%'
      className='fill-flag-red-500 group-hover:fill-flag-red-600 group-hover:drop-shadow-sm'
    />
  </button>
);

export default XButton;
