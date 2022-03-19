import { PlayerWithPlayerCards } from '@yiyumin/golf-game-library/types';

import GameLobbyPlayer from './GameLobbyPlayer';

type GameLobbyPlayersProps = {
  player: PlayerWithPlayerCards;
  players: PlayerWithPlayerCards[];
  openChangeNameModal: () => void;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameLobbyPlayers = ({
  player,
  players,
  openChangeNameModal,
  openKickPlayerModal,
}: GameLobbyPlayersProps) => {
  return (
    <div className='flex h-2/6 w-5/6 flex-col items-center rounded-large bg-sandtrap-white-500 py-5 lg:h-2/3 lg:w-1/6 lg:py-10'>
      <h3 className='text-lg font-bold uppercase md:text-2xl'>
        Players ({players.length + 1})
      </h3>
      <div className='mt-2 flex w-4/5 flex-col gap-2 overflow-auto lg:my-5'>
        <GameLobbyPlayer
          player={player}
          isSelf={true}
          openChangeNameModal={openChangeNameModal}
          openKickPlayerModal={openKickPlayerModal}
        />
        {players.map((player, idx) => (
          <GameLobbyPlayer
            key={idx}
            player={player}
            isSelf={false}
            openKickPlayerModal={openKickPlayerModal}
          />
        ))}
      </div>
    </div>
  );
};

export default GameLobbyPlayers;
