import clsx from 'clsx';

type ButtonSize = 'small' | 'large';

interface NavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  onClick?: () => void;
}

const NavigationButton = ({
  children,
  buttonSize = 'large',
  disabled,
  onClick,
  ...props
}: NavigationButtonProps) => (
  <button
    className={clsx(
      'rounded-2xl font-bold uppercase text-white hover:shadow-sm',
      buttonSize === 'small'
        ? 'h-10 w-3/5 text-base md:h-16 md:w-52 md:text-2xl'
        : 'h-20 w-4/5 text-2xl md:w-80',
      disabled
        ? 'bg-flag-red-300 hover:cursor-default'
        : 'bg-flag-red-500 hover:bg-flag-red-600'
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default NavigationButton;
