import { Status } from '../types';
import PlayerStatus from './PlayerStatus';

type PlayerBadgeStatusProps = {
  status?: Status;
};

const PlayerBadgeStatus = ({
  status = { message: '', statusType: 'default' },
}: PlayerBadgeStatusProps) => (
  <div className='whitespace-nowrap text-xs uppercase'>
    <PlayerStatus status={status} />
  </div>
);

export default PlayerBadgeStatus;
