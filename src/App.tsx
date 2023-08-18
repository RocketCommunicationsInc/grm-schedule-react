import { RuxNotification } from '@astrouxds/react';

import { useAppActions } from 'hooks/useAppActions';
import { useAppContext } from 'providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
import Main from './components/Main';
import './App.css';

const App = () => {
  const { resetNotification } = useAppActions();
  const { state } = useAppContext();

  return (
    <>
      <GlobalStatusBar />
      <RuxNotification
        small
        closeAfter={5000}
        message={state.notification}
        open={!!state.notification}
        onRuxclosed={() => resetNotification()}
      />
      <Main />
    </>
  );
};

export default App;
