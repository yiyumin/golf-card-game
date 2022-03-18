import Modal from '../util/Modal';
import { Button } from '../buttons';

type KickPlayerModalProps = {
  playerToKick?: {
    id: string;
    name: string;
  };
  handleClose: () => void;
  kickPlayer: (playerId: string) => void;
};

const KickPlayerModal = ({
  playerToKick,
  handleClose,
  kickPlayer,
}: KickPlayerModalProps) => {
  const onConfirm = (playerId: string) => {
    kickPlayer(playerId);
    handleClose();
  };

  return (
    <Modal isOpen={!!playerToKick} handleClose={handleClose}>
      {playerToKick && (
        <div className='flex h-full flex-col items-center justify-center gap-12'>
          <div className='text-center text-2xl'>
            Kick {playerToKick.name} out?
          </div>
          <Button onClick={() => onConfirm(playerToKick.id)}>Kick</Button>
        </div>
      )}
    </Modal>
  );
};

export default KickPlayerModal;
