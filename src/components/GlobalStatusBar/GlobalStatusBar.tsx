import { useEffect, useState } from 'react';
import {
  RuxGlobalStatusBar,
  RuxClock,
  RuxPopUp,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMenuItemDivider,
  RuxMonitoringProgressIcon,
  RuxNotification,
} from '@astrouxds/react';

import './GlobalStatusBar.css';

const GlobalStatusBar = () => {
  const [count, setCount] = useState(0);
  const [openBanner, setOpenBanner] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <RuxNotification
        small
        closeAfter={3}
        onRuxclosed={() => setOpenBanner(false)}
        open={openBanner}
      >
        This feature has not been implemented.
      </RuxNotification>
      <RuxGlobalStatusBar
        className='Global-status-bar'
        app-domain='GRM'
        app-name='SCHEDULE'
        username='J. Smith'
      >
        <RuxPopUp
          closeOnSelect
          id='grm-popup-menu'
          placement='bottom-start'
          slot='left-side'
        >
          <RuxIcon
            icon='apps'
            aria-controls='grm-popup-menu'
            slot='trigger'
            size='2rem'
          />
          <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
            <RuxMenuItem>GRM Dashboard</RuxMenuItem>
            <RuxMenuItem>GRM Equipment Manager</RuxMenuItem>
            <RuxMenuItem>GRM Schedule</RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem>Preferences...</RuxMenuItem>
            <RuxMenuItem>Sign Out...</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>

        <RuxClock />

        <RuxMonitoringProgressIcon
          slot='right-side'
          label='UCA'
          progress={count}
          range={[]}
        />
      </RuxGlobalStatusBar>
    </>
  );
};

export default GlobalStatusBar;
