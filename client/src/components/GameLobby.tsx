import { useState, useMemo } from 'react';

import BackNavigation from './BackNavigation';
import GameLobbyPlayers from './GameLobbyPlayers';
import GameLobbySettings from './GameLobbySettings';
import { ChangeGameWordModal } from './modals';
import { PlayerWithPlayerCards } from '@yiyumin/golf-game-library/types';

type GameLobbyProps = {
  gameId: string;
  player: PlayerWithPlayerCards;
  players: PlayerWithPlayerCards[];
  gameWord: string;
  changeGameWord: (gameWord: string) => void;
  toggleGameReady: () => void;
  startGame: () => void;
  goBack: () => void;
  openChangeNameModal: () => void;
  openKickPlayerModal: (player: { id: string; name: string }) => void;
};

const GameLobby = ({
  gameId,
  player,
  players,
  gameWord,
  changeGameWord,
  toggleGameReady,
  startGame,
  goBack,
  openChangeNameModal,
  openKickPlayerModal,
}: GameLobbyProps) => {
  const [isChangeGameWordModalOpen, setIsChangeGameWordModalOpen] =
    useState(false);

  const isGameStartable = useMemo(
    () =>
      players.length > 0 &&
      player.isGameReady &&
      players.every((player) => player.isGameReady),
    [player, players]
  );

  return (
    <>
      <div className='flex h-full flex-col items-center justify-evenly py-5 lg:flex-row lg:justify-center lg:gap-x-16 lg:py-0'>
        <GameLobbyPlayers
          player={player}
          players={players}
          openChangeNameModal={openChangeNameModal}
          openKickPlayerModal={openKickPlayerModal}
        />
        <GameLobbySettings
          gameId={gameId}
          gameWord={gameWord}
          isGameReady={player.isGameReady}
          isGameStartable={isGameStartable}
          openChangeGameWordModal={() => setIsChangeGameWordModalOpen(true)}
          startGame={startGame}
          toggleGameReady={toggleGameReady}
        />
      </div>

      <BackNavigation onClick={goBack} />
      <ChangeGameWordModal
        gameWord={gameWord}
        isOpen={isChangeGameWordModalOpen}
        handleClose={() => setIsChangeGameWordModalOpen(false)}
        changeGameWord={changeGameWord}
      />
    </>
  );
};

export default GameLobby;
