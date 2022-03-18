type PlayerCardsWrapperProps = {
  children: React.ReactNode;
};

const PlayerCardsWrapper = ({ children }: PlayerCardsWrapperProps) => (
  <div className='inline-grid grid-cols-[repeat(2,_min-content)] gap-1'>
    {children}
  </div>
);

export default PlayerCardsWrapper;
