import { PlayerCard } from '../../../lib/types';

import PlayerCardsWrapper from './PlayerCardsWrapper';
import Card from './Card';

type GameTableMainPlayerCardsProps = {
  cards?: PlayerCard[];
  clickable: boolean;
  isHidden: boolean;
  onClick: (idx: number) => () => void;
};

const GameTableMainPlayerCards = ({
  cards,
  clickable,
  isHidden,
  onClick,
}: GameTableMainPlayerCardsProps) => (
  <PlayerCardsWrapper>
    {cards &&
      cards.map((card, idx) => (
        <Card
          key={idx}
          card={isHidden ? 'facedown' : card}
          clickable={clickable}
          cardType='main-player'
          onClick={onClick(idx)}
        />
      ))}
  </PlayerCardsWrapper>
);

export default GameTableMainPlayerCards;
