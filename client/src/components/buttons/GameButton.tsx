type GameButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const GameButton = ({ children, onClick }: GameButtonProps) => (
  <button
    className='rounded-md bg-sandtrap-white-500 p-2 text-xs font-bold uppercase text-black hover:bg-sandtrap-white-700 hover:shadow-sm'
    onClick={onClick}
  >
    {children}
  </button>
);

export default GameButton;
