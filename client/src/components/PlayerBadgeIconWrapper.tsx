type PlayerBadgeIconWrapperProps = {
  children: React.ReactNode;
};

const PlayerBadgeIconWrapper = ({ children }: PlayerBadgeIconWrapperProps) => {
  return (
    <div className='absolute top-0 right-4 flex h-full w-5 items-center'>
      {children}
    </div>
  );
};

export default PlayerBadgeIconWrapper;
