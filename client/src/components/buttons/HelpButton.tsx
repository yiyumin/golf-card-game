type HelpButtonProps = {
  onClick?: () => void;
};

const HelpButton = ({ onClick }: HelpButtonProps) => (
  <button
    className='group h-12 w-12 rounded-full border-2 border-white/50 bg-gray-500/50 font-bold text-white/50 shadow-2xl transition hover:border-white/75 hover:bg-gray-500/75 hover:text-white/75 md:h-14 md:w-14 md:text-2xl lg:h-16 lg:w-16'
    onClick={onClick}
  >
    ?
  </button>
);

export default HelpButton;
