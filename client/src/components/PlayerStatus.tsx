import { Status, StatusType } from '../types';

const STATUS_TYPE_MAP: Record<StatusType, string> = {
  default: 'text-sky-blue-500',
  success: 'text-green-500',
  warning: 'text-orange-400',
  error: 'text-flag-red-500',
};

type PlayerStatusProps = {
  status: Status;
};

const PlayerStatus = ({
  status: { message, statusType },
}: PlayerStatusProps) => (
  <span className={STATUS_TYPE_MAP[statusType]}>{message}</span>
);

export default PlayerStatus;
