import {
  Card,
  GameState,
  RoundState,
  TurnState,
} from '@yiyumin/golf-game-library/types';

import GameTableSharedCards from './GameTableSharedCards';
import GameTableSharedControls from './GameTableSharedControls';

type GameTableSharedProps = {
  discardPileTopCard: Card;
  drawPileCardCount: number;
  gameState: GameState;
  roundState: RoundState;
  turnState: TurnState;
  isPlayerTurn: boolean;
  isEliminated: boolean;
  discardCard: () => void;
  takeFromDiscardPile: () => void;
  takeFromDrawPile: () => void;
  resetGame: () => void;
  dealNewRound: () => void;
  showResult: () => void;
};

const GameTableShared = ({
  discardPileTopCard,
  drawPileCardCount,
  gameState,
  roundState,
  turnState,
  isPlayerTurn,
  isEliminated,
  discardCard,
  takeFromDiscardPile,
  takeFromDrawPile,
  resetGame,
  dealNewRound,
  showResult,
}: GameTableSharedProps) => {
  return (
    <div className='relative h-full overflow-hidden rounded-2xl bg-fairway-green-500'>
      {(roundState === 'started' || roundState === 'finished') && (
        <>
          <GameTableSharedCards
            discardPileTopCard={discardPileTopCard}
            drawPileCardCount={drawPileCardCount}
            isDiscardPileClickable={
              isPlayerTurn &&
              roundState === 'started' &&
              turnState !== 'card_discarded'
            }
            isDrawPileClickable={
              isPlayerTurn &&
              roundState === 'started' &&
              turnState === 'not_started'
            }
            onDiscardPileClick={
              turnState === 'card_taken' ? discardCard : takeFromDiscardPile
            }
            onDrawPileClick={takeFromDrawPile}
          />

          {roundState === 'finished' && (
            <GameTableSharedControls
              isGameOver={gameState === 'finished'}
              isEliminated={isEliminated}
              resetGame={resetGame}
              dealNewRound={dealNewRound}
              showResult={showResult}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GameTableShared;
