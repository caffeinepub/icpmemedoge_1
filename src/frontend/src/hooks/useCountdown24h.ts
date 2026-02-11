import { useState, useEffect } from 'react';

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function useCountdown24h() {
  const [startTime] = useState(() => Date.now());
  const [timeRemaining, setTimeRemaining] = useState(TWENTY_FOUR_HOURS_MS);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, TWENTY_FOUR_HOURS_MS - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
