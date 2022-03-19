import clsx from 'clsx';

import { Suit, Card } from '@yiyumin/golf-card-game-library/types';
import { CardType } from '../types';

const SUIT_COLOR_MAP: Record<Suit, string> = {
  '♠': 'text-black',
  '♣': 'text-black',
  '♥': 'text-flag-red-500',
  '♦': 'text-flag-red-500',
};

const CARD_TYPE_FONT_SIZE_MAP: Record<CardType, string> = {
  shared: 'text-sm md:text-lg',
  player: 'text-xs',
  'main-player': 'text-sm md:text-base',
};

type CardFaceupProps = {
  card: Card;
  clickable: boolean;
  cardType: CardType;
  onClick?: () => void;
};

const CardFaceup = ({
  card,
  clickable,
  cardType,
  onClick,
}: CardFaceupProps) => (
  <button
    disabled={!clickable}
    onClick={onClick}
    className={clsx(
      'flex h-full w-full items-center justify-center rounded bg-sandtrap-white-500 font-bold',
      clickable ? 'shadow-lg hover:bg-sandtrap-white-700' : 'opacity-50',
      SUIT_COLOR_MAP[card.suit],
      CARD_TYPE_FONT_SIZE_MAP[cardType]
    )}
  >
    {card.rank} {card.suit}
  </button>
);

export default CardFaceup;
