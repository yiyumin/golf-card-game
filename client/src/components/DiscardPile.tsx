import { Card } from '@yiyumin/golf-card-game-library/types';

import CardWrapper from './CardWrapper';
import CardFaceup from './CardFaceup';
import CardEmpty from './CardEmpty';

type DiscardPileProps = {
  discardPileTopCard: Card;
  clickable: boolean;
  onClick: () => void;
};

const DiscardPile = ({ discardPileTopCard, ...props }: DiscardPileProps) => {
  return (
    <CardWrapper cardType='shared'>
      {!discardPileTopCard ? (
        <CardEmpty {...props} />
      ) : (
        <CardFaceup card={discardPileTopCard} cardType='shared' {...props} />
      )}
    </CardWrapper>
  );
};

export default DiscardPile;
