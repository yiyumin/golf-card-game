import { BackButton } from './buttons';

type BackNavigationProps = {
  onClick: () => void;
};

const BackNavigation = ({ onClick }: BackNavigationProps) => {
  return (
    <div className='absolute top-5 left-2 md:top-8 md:left-5 lg:top-12 lg:left-8'>
      <BackButton onClick={onClick} />
    </div>
  );
};

export default BackNavigation;
