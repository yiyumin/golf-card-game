import { PlayerCard } from '../../../lib/types';
import { CardType } from '../types';

import CardWrapper from './CardWrapper';
import CardFacedown from './CardFacedown';
import CardFaceup from './CardFaceup';

type CardProps = {
  card: PlayerCard;
  clickable: boolean;
  cardType: CardType;
  onClick?: () => void;
};

const Card = ({ card, cardType, ...props }: CardProps) => {
  return (
    <CardWrapper cardType={cardType}>
      {card === 'facedown' ? (
        <CardFacedown cardType={cardType} {...props} />
      ) : (
        <CardFaceup card={card} cardType={cardType} {...props} />
      )}
    </CardWrapper>
  );
};

export default Card;
