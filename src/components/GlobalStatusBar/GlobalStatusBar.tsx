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
} from '@astrouxds/react';
import type { Status } from 'Types';

import './GlobalStatusBar.css';

type RangeItem = {
  threshold: number;
  status: Status;
};

const range: RangeItem[] = [
  {
    threshold: 17,
    status: 'off',
  },
  {
    threshold: 33,
    status: 'critical',
  },
  {
    threshold: 50,
    status: 'serious',
  },
  {
    threshold: 66,
    status: 'caution',
  },
  {
    threshold: 83,
    status: 'standby',
  },
  {
    threshold: 33,
    status: 'normal',
  },
];

const GlobalStatusBar = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <RuxGlobalStatusBar
      className='Global-status-bar'
      app-domain='GRM'
      app-name='Schedule'
      username='J. Smith'
    >
      <RuxPopUp id='grm-popup-menu' placement='bottom-start' slot='left-side'>
        <RuxIcon
          icon='apps'
          aria-controls='grm-popup-menu'
          slot='trigger'
          size='2rem'
        />
        <RuxMenu>
          <RuxMenuItem>GRM Dashboard</RuxMenuItem>
          <RuxMenuItem>GRM Equipment Manager</RuxMenuItem>
          <RuxMenuItem>GRM Schedule</RuxMenuItem>
          <RuxMenuItemDivider />
          <RuxMenuItem>Preferences...</RuxMenuItem>
          <RuxMenuItem>Sign Out...</RuxMenuItem>
        </RuxMenu>
      </RuxPopUp>

      <RuxClock />

      <div className='Global-status-bar__status-indicators' slot='right-side'>
        <RuxMonitoringProgressIcon label='UCA' progress={count} range={range} />
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
