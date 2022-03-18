import { Card } from '../../../lib/types';

import DiscardPile from './DiscardPile';
import DrawPile from './DrawPile';

type GameTableSharedCardsProps = {
  discardPileTopCard: Card;
  drawPileCardCount: number;
  isDiscardPileClickable: boolean;
  isDrawPileClickable: boolean;
  onDiscardPileClick: () => void;
  onDrawPileClick: () => void;
};

const GameTableSharedCards = ({
  discardPileTopCard,
  drawPileCardCount,
  isDiscardPileClickable,
  isDrawPileClickable,
  onDiscardPileClick,
  onDrawPileClick,
}: GameTableSharedCardsProps) => (
  <div className='flex h-full items-center justify-center'>
    <div className='flex w-full justify-around lg:w-1/2'>
      <DiscardPile
        discardPileTopCard={discardPileTopCard}
        clickable={isDiscardPileClickable}
        onClick={onDiscardPileClick}
      />
      <DrawPile
        drawPileCardCount={drawPileCardCount}
        clickable={isDrawPileClickable}
        onClick={onDrawPileClick}
      />
    </div>
  </div>
);

export default GameTableSharedCards;
