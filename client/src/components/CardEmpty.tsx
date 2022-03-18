import clsx from 'clsx';

type CardEmptyProps = {
  clickable: boolean;
  onClick?: () => void;
};

const CardEmpty = ({ clickable, onClick }: CardEmptyProps) => (
  <button
    disabled={!clickable}
    onClick={onClick}
    className={clsx(
      'h-full w-full rounded border-2 bg-black/20',
      clickable
        ? 'border-black shadow-lg hover:bg-black/50'
        : 'border-black/20 opacity-75'
    )}
  />
);

export default CardEmpty;
