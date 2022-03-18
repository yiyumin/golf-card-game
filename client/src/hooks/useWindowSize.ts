import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }
  );

  useEffect(() => {
    const setNewWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', setNewWindowSize);
    return () => window.removeEventListener('resize', setNewWindowSize);
  }, []);

  return windowSize;
};

export { useWindowSize };
