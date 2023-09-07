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
  RuxToastStack,
} from '@astrouxds/react';
import type { Status } from 'Types';
import './GlobalStatusBar.css';
import { addToast } from '../../utils/utils';

type RangeItem = {
  threshold: number;
  status: Status;
};

const GlobalStatusBar = () => {
  const [count, setCount] = useState(0);
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function menuSelect(e: CustomEvent) {
    const { detail } = e;
    if (detail.value === 'notImplemented') {
      addToast('This feature has not been implemented', false, 3000);
      return;
    }
    if (detail.value === 'themeToggle') {
      setLightTheme(!lightTheme);
      document.body.classList.toggle('light-theme');
      return;
    }
  }

  const range: RangeItem[] = [
    { threshold: 17, status: 'off' },
    { threshold: 33, status: 'critical' },
    { threshold: 50, status: 'serious' },
    { threshold: 66, status: 'caution' },
    { threshold: 83, status: 'standby' },
    { threshold: 100, status: 'normal' },
  ];

  return (
    <>
      <RuxToastStack />
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
            className='app-switcher-icon'
          />

          <RuxMenu onRuxmenuselected={(e) => menuSelect(e)}>
            <RuxMenuItem href='https://grm-dashboard-react.netlify.app'>
              GRM Dashboard
            </RuxMenuItem>
            <RuxMenuItem href='https://grm-equipment-react-ts.netlify.app'>
              GRM Equipment Manager
            </RuxMenuItem>
            <RuxMenuItem>GRM Schedule</RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem value='themeToggle'>
              {lightTheme ? 'Dark' : 'Light'} Theme
            </RuxMenuItem>
            <RuxMenuItem value='notImplemented'>Preferences...</RuxMenuItem>
            <RuxMenuItem value='notImplemented'>Sign Out...</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>

        <RuxClock />

        <RuxMonitoringProgressIcon
          slot='right-side'
          label='UCA'
          progress={count}
          range={range}
        />
      </RuxGlobalStatusBar>
    </>
  );
};

export default GlobalStatusBar;
