import clsx from 'clsx';

import { CardType } from '../types';

import { ReactComponent as GolfIcon } from '../icons/golf.svg';

const CARD_TYPE_LOGO_SIZE_MAP: Record<CardType, string> = {
  shared: 'w-5 md:w-7',
  player: 'w-3',
  'main-player': 'w-5 md:w-6',
};

type CardFacedownProps = {
  clickable: boolean;
  cardType: CardType;
  onClick?: () => void;
};

const CardFacedown = ({ clickable, cardType, onClick }: CardFacedownProps) => (
  <button
    disabled={!clickable}
    onClick={onClick}
    className={clsx(
      'flex h-full w-full items-center justify-center rounded bg-sky-blue-500',
      clickable ? 'shadow-lg hover:bg-sky-blue-600' : 'opacity-50'
    )}
  >
    <div className={CARD_TYPE_LOGO_SIZE_MAP[cardType]}>
      <GolfIcon className='fill-white' />
    </div>
  </button>
);

export default CardFacedown;
