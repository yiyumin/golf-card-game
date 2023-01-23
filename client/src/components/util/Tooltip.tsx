type TooltipProps = {
  text: string;
  visible: boolean;
};

const Tooltip = ({ text, visible }: TooltipProps) => {
  return (
    <>
      {visible && (
        <div className='absolute bottom-full -translate-y-2 rounded-lg bg-black p-4 text-sm font-normal normal-case'>
          <div className='text-white'>{text}</div>
          <div className='absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-black' />
        </div>
      )}
    </>
  );
};

export default Tooltip;
