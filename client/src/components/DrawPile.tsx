import CardWrapper from './CardWrapper';
import CardFacedown from './CardFacedown';
import CardEmpty from './CardEmpty';

type DrawPileProps = {
  drawPileCardCount: number;
  clickable: boolean;
  onClick: () => void;
};

const DrawPile = ({ drawPileCardCount, ...props }: DrawPileProps) => {
  return (
    <CardWrapper cardType='shared'>
      {drawPileCardCount > 0 ? (
        <CardFacedown cardType='shared' {...props} />
      ) : (
        <CardEmpty clickable={false} />
      )}
    </CardWrapper>
  );
};

export default DrawPile;
