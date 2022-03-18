import { PlayerCard } from '../../../lib/types';

import Card from './Card';
import PlayerCardsWrapper from './PlayerCardsWrapper';

type GameTablePlayerCardsProps = {
  cards?: PlayerCard[];
  isHidden: boolean;
};

const GameTablePlayerCards = ({
  cards,
  isHidden,
}: GameTablePlayerCardsProps) => (
  <PlayerCardsWrapper>
    {cards &&
      cards.map((card, idx) => (
        <Card
          key={idx}
          card={isHidden ? 'facedown' : card}
          clickable={false}
          cardType='player'
        />
      ))}
  </PlayerCardsWrapper>
);

export default GameTablePlayerCards;
