import { Status } from '../types';

import { EditButton, XButton } from './buttons';
import PlayerBadgeIconWrapper from './PlayerBadgeIconWrapper';
import PlayerBadgeOnlineIndicator from './PlayerBadgeOnlineIndicator';
import PlayerBadgeStatus from './PlayerBadgeStatus';

type PlayerBadgeProps = {
  id: string;
  name: string;
  status?: Status;
  isConnected: boolean;
  isSelf: boolean;
  isKickable?: boolean;
  openChangeNameModal?: () => void;
  openKickPlayerModal?: (player: { id: string; name: string }) => void;
};

const PlayerBadge = ({
  id,
  name,
  status,
  isConnected,
  isSelf,
  isKickable,
  openChangeNameModal,
  openKickPlayerModal,
}: PlayerBadgeProps) => (
  <div className='relative flex min-w-[10rem] flex-col gap-y-2 rounded-small bg-black/35 py-3 px-8'>
    <div
      className='mr-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-white'
      title={name}
    >
      {name}
    </div>
    <PlayerBadgeStatus status={status} />

    <PlayerBadgeOnlineIndicator isConnected={isConnected} />
    <PlayerBadgeIconWrapper>
      {isSelf && <EditButton onClick={openChangeNameModal} />}

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

export default PlayerBadge;
