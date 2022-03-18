import { Status } from '../types';

import { XButton } from './buttons';

import PlayerBadgeIconWrapper from './PlayerBadgeIconWrapper';
import PlayerBadgeOnlineIndicator from './PlayerBadgeOnlineIndicator';
import PlayerBadgeStatus from './PlayerBadgeStatus';

type GameTablePlayerBadgeProps = {
  id: string;
  name: string;
  status?: Status;
  isConnected: boolean;
  isKickable?: boolean;
  openKickPlayerModal?: (player: { id: string; name: string }) => void;
};

const GameTablePlayerBadge = ({
  id,
  name,
  status = { message: '', statusType: 'default' },
  isConnected,
  isKickable,
  openKickPlayerModal,
}: GameTablePlayerBadgeProps) => (
  <div className='relative flex h-full w-full flex-col rounded-small bg-black/35 px-8 py-1'>
    <div
      className='h-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-white'
      title={name}
    >
      {name}
    </div>
    <PlayerBadgeStatus status={status} />

    <PlayerBadgeOnlineIndicator isConnected={isConnected} />
    <PlayerBadgeIconWrapper>
      {isKickable && (
        <XButton
          onClick={
            openKickPlayerModal && (() => openKickPlayerModal({ id, name }))
          }
        />
      )}
    </PlayerBadgeIconWrapper>
  </div>
);

export default GameTablePlayerBadge;
