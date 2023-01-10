import { RuxGlobalStatusBar, RuxClock } from '@astrouxds/react';

const GlobalStatusBar = () => {
  return (
    <RuxGlobalStatusBar>
      <RuxClock />
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
