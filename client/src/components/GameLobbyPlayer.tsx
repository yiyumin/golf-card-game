import { PlayerWithPlayerCards } from '@yiyumin/golf-card-game-library/types';

import PlayerBadge from './PlayerBadge';

type GameLobbyPlayerProps = {
  player: PlayerWithPlayerCards;
  isSelf: boolean;
  openChangeNameModal?: () => void;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameLobbyPlayer = ({
  player: { id, name, isGameReady, isConnected },
  isSelf,
  openChangeNameModal,
  openKickPlayerModal,
}: GameLobbyPlayerProps) => {
  return (
    <PlayerBadge
      id={id}
      name={name}
      isSelf={isSelf}
      status={{
        message: `${isGameReady ? '' : 'Not '}Ready`,
        statusType: isGameReady ? 'success' : 'warning',
      }}
      isConnected={isConnected}
      isKickable={!isConnected}
      openChangeNameModal={openChangeNameModal}
      openKickPlayerModal={openKickPlayerModal}
    />
  );
};

export default GameLobbyPlayer;
