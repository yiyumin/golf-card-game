import { useState, useMemo, createRef, useEffect } from 'react';

import Modal from '../util/Modal';
import { DownButton, UpButton } from '../buttons';

const rules = [
  {
    header: 'Introduction/Objective',
    content: (
      <p>
        Golf is a card game for two or more players (around four players is
        best). The objective is to be the last player standing as players are
        eliminated throughout the game. During each round, players are dealt
        four cards, in which players will try to swap out their cards to attain
        the lowest score possible (just like the sport of golf!).
      </p>
    ),
  },
  {
    header: 'Deal',
    content: (
      <p>
        Four cards are dealt to each player at the beginning of a round. These
        cards are arranged in 2x2 square face-down in front of each player. The
        remaining cards are placed face-down and become the draw pile. The
        topmost card is placed next to the draw pile face-up and becomes the
        discard pile. Before play begins, each player may look at their nearest
        two cards once. After this, these cards may not be looks at again until
        the end of the round!
      </p>
    ),
  },
  {
    header: 'Turn',
    content: (
      <p>
        A player's turn begins by either taking a card from the draw pile or
        taking the topmost card from the discard pile. The player can choose to
        swap out one of their four cards with this card. However, the player is
        not allowed to look at any of the cards in their layout before deciding
        which card to replace. When a player swaps out a card, the card being
        swapped out is automatically placed on top of the discard pile.
      </p>
    ),
  },
  {
    header: 'Turn (continued)',
    content: (
      <>
        <p>
          If the player decides they do not like the card that they drew, they
          can simply choose to discard the card by clicking on the discard pile.
        </p>

        <p>
          Once a player swaps or discards a card, they can choose to either
          finish their turn or call golf. If a player calls golf, remaining
          players will have one more opportunity to draw and swap out a card
          before the round finishes.
        </p>
      </>
    ),
  },
  {
    header: 'Round Finish',
    content: (
      <p>
        At the end of the round, all player's card are turned face-up and each
        player's score will be calculated based on their hand. The player(s)
        with the highest point total will become the loser(s) of the round.
      </p>
    ),
  },
  {
    header: 'Cards/Scoring',
    content: (
      <>
        <p>
          Golf is played using a standard 52-card deck. Games are automatically
          adjusted to use additional decks for games with more than four
          players. Player's hands are scored by summing up the point total of
          their four cards. Cards are scored as follows:
        </p>

        <table className='w-5/6 text-xs md:text-base'>
          <thead>
            <tr>
              <th className='w-1/2'>Card</th>
              <th className='w-1/2'>Point(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ace</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Jack</td>
              <td>0</td>
            </tr>
            <tr>
              <td>All other face cards</td>
              <td>10</td>
            </tr>
            <tr>
              <td>All other cards</td>
              <td title='(two=2, three=3, etc.)'>face value</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    header: 'Elimination/Winner',
    content: (
      <p>
        After each round, the loser(s) acquire(s) a letter, starting with "G"
        and moving rightward through the word "GOLF". Once a player acquires all
        of the letters of "GOLF", they are eliminated from the game. The last
        player remaining is declared the winner of the game!
      </p>
    ),
  },
];

type RulesModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const RulesModal = ({ isOpen, handleClose }: RulesModalProps) => {
  const rulesRefs = useMemo(
    () =>
      Array(rules.length)
        .fill(0)
        .map((_) => createRef<HTMLDivElement>()),
    []
  );

  const [rulesIdx, setRulesIdx] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        setRulesIdx((idx) => (idx > 0 ? idx - 1 : idx));
      } else if (e.key === 'ArrowDown') {
        setRulesIdx((idx) => (idx < rules.length - 1 ? idx + 1 : idx));
      }
    });
  }, []);

  useEffect(() => {
    rulesRefs[rulesIdx].current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [rulesRefs, rulesIdx]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className='pointer-events-none flex h-full w-full justify-center'>
        <div className='h-full w-11/12 snap-y snap-mandatory overflow-y-auto scrollbar-hide'>
          {rules.map(({ header, content }, idx) => (
            <div
              key={idx}
              ref={rulesRefs[idx]}
              className='flex h-full snap-start flex-col items-center gap-y-5 p-5 md:gap-y-8 md:p-8 md:text-xl'
            >
              <h3 className='text-xl font-bold md:text-2xl'>{header}</h3>
              {content}
            </div>
          ))}
        </div>
      </div>

      <div className='absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-10 md:right-5'>
        <UpButton
          disabled={rulesIdx <= 0}
          onClick={() => setRulesIdx((idx) => idx - 1)}
        />
        <DownButton
          disabled={rulesIdx >= rules.length - 1}
          onClick={() => setRulesIdx((idx) => idx + 1)}
        />
      </div>
    </Modal>
  );
};

export default RulesModal;
