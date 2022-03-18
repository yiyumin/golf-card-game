import { ReactComponent as ChevronUpIcon } from '../../icons/chevron-up.svg';

interface UpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const UpButton = ({ onClick, ...props }: UpButtonProps) => {
  return (
    <button className='group h-8 w-8' onClick={onClick} {...props}>
      <ChevronUpIcon
        width='100%'
        height='100%'
        className='fill-sky-blue-500 drop-shadow-sm transition group-hover:fill-sky-blue-700 group-disabled:fill-sky-blue-200 group-disabled:drop-shadow-none'
      />
    </button>
  );
};

export default UpButton;
