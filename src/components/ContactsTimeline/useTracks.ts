import { useEffect, useState } from 'react';

export const useTracks = (data: [any][]) => {
  const [tracks, setTracks] = useState({});

  useEffect(() => {
    data.forEach(([label]) => {
      setTracks((prev) => ({ ...prev, [label]: false }));
    });
  }, [data]);

  const handleExpanded = (label: string | number) => {
    setTracks((prev) => ({
      ...prev,
      [label]: prev[label as keyof typeof prev] ? false : true,
    }));
  };

  return [tracks, handleExpanded];
};
