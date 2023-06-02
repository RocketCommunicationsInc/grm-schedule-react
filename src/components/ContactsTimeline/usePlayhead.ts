import { useEffect, useState } from 'react';

const setIso = (time: Date | number) => new Date(time).toISOString();
const setHours = (hours: number) => 1000 * 60 * 60 * hours;

export const usePlayhead = (startDate: Date) => {
  const time = startDate.getTime();
  const [playhead, setPlayhead] = useState(setIso(time + setHours(1.5)));

  useEffect(() => {
    const tickIntereval = 1000 * 5; // 5 seconds

    const interval = setInterval(() => {
      setPlayhead((prev) => {
        const tick = new Date(prev).getTime() + tickIntereval;
        return setIso(tick);
      });
    }, tickIntereval);

    return () => clearInterval(interval);
  }, []);

  return playhead;
};
