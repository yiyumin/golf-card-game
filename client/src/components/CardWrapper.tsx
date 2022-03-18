import { CardType } from '../types';

const CARD_TYPE_SIZE_MAP: Record<CardType, string> = {
  shared: 'h-16 w-12 md:h-28 md:w-20',
  player: 'h-12 w-9',
  'main-player': 'h-16 w-12 md:h-20 md:w-16',
};

type CardWrapperProps = {
  children: React.ReactNode;
  cardType: CardType;
};

const CardWrapper = ({ children, cardType }: CardWrapperProps) => (
  <div className={CARD_TYPE_SIZE_MAP[cardType]}>{children}</div>
);

export default CardWrapper;
