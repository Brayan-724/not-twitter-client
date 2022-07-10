import { useEffect, useState } from 'react';
import timeAgo from '../utils/ago';

export function useClock(initial: Date): string {
  const [ago, setAgo] = useState(timeAgo(initial));

  useEffect(() => {
    setAgo(timeAgo(initial));

    const interval = setInterval(() => {
      setAgo(timeAgo(initial));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [initial]);

  return ago;
}
