import { ReactComponent as PencilIcon } from '../../icons/pencil.svg';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => (
  <button className='group' onClick={onClick}>
    <PencilIcon
      width='100%'
      height='100%'
      className='fill-sandtrap-white-100 group-hover:fill-sandtrap-white-500 group-hover:drop-shadow-sm'
    />
  </button>
);

export default EditButton;
