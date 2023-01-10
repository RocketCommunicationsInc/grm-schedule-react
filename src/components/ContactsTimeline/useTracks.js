import { useEffect, useState } from 'react';

export const useTracks = (data) => {
  const [tracks, setTracks] = useState({});

  useEffect(() => {
    data.forEach(([label]) => {
      setTracks((prev) => ({ ...prev, [label]: false }));
    });
  }, [data]);

  const handleExpanded = (label) => {
    setTracks((prev) => ({
      ...prev,
      [label]: prev[label] ? false : true,
    }));
  };

  return [tracks, handleExpanded];
};
