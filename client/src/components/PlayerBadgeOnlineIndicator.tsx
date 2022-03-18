import { ReactComponent as DotIcon } from '../icons/dot.svg';

type PlayerBadgeOnlineIndicatorProps = {
  isConnected: boolean;
};

const PlayerBadgeOnlineIndicator = ({
  isConnected,
}: PlayerBadgeOnlineIndicatorProps) => {
  return (
    <div className='absolute top-3 left-3'>
      <DotIcon className={isConnected ? 'fill-green-300' : 'fill-red-500'} />
    </div>
  );
};

export default PlayerBadgeOnlineIndicator;
