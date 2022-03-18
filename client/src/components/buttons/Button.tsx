interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Button = ({ children, onClick, ...props }: ButtonProps) => (
  <button
    className='rounded-md bg-sky-blue-500 p-3 text-sm uppercase text-white hover:bg-sky-blue-600 hover:shadow-sm sm:text-lg xl:p-4'
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default Button;
