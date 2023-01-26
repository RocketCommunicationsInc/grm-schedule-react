import { useState } from 'react';
import classNames from 'classnames';
import { RuxNotification } from '@astrouxds/react';

import { useAppActions } from 'hooks/useAppActions';
import { useAppContext } from 'providers/AppProvider';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import ContactDetails from './ManageContacts/ContactDetails';
import ManageContact from './ManageContacts/ManageContact';
import './App.scss';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const { resetNotification } = useAppActions();
  const { state } = useAppContext();

  const handleAction = (action) => {
    if (action) {
      setIsOpen(true);
      setAction(action);
      return;
    }

    setIsOpen(false);
    setAction('');
  };

  let rigthPanel = null;

  if (action === 'details') {
    rigthPanel = <ContactDetails handleAction={handleAction} />;
  }

  if (action === 'add' || action === 'modify') {
    rigthPanel = <ManageContact action={action} handleAction={handleAction} />;
  }

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

      <main
        className={classNames('App-main', {
          notification: !!state.notification,
        })}
      >
        <section className='App-main__container'>
          <ContactsHeader {...{ isOpen, handleAction }} />

          <div className='App-main__panels'>
            <div className={classNames('App-main__left-panel', { isOpen })}>
              <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

              {view === 'List' ? (
                <ContactsList handleAction={handleAction} />
              ) : (
                <ContactsTimeline handleAction={handleAction} zoom={zoom} />
              )}
            </div>

            <div className={classNames('App-main__right-panel', { isOpen })}>
              {rigthPanel}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
