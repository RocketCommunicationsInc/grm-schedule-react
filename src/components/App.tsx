import { SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { RuxContainer, RuxInput, RuxNotification } from '@astrouxds/react';

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
import ManagePanel from './ManageContacts/ManagePanel';
import FilterContacts from './ManageContacts/FilterContacts';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const { resetNotification } = useAppActions();
  const { state } = useAppContext();

  const handleAction = (action: SetStateAction<string>) => {
    if (action) {
      setIsOpen(true);
      setAction(action);
      return;
    }

    setIsOpen(false);
    setAction('');
  };

  let rigthPanel = null;

  if (action === 'manage') {
    rigthPanel = <ManagePanel handleAction={handleAction} />;
  }

  if (action === 'details') {
    rigthPanel = <ContactDetails handleAction={handleAction} />;
  }

  if (action === 'filter') {
    rigthPanel = <FilterContacts action={action} handleAction={handleAction} />;
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
        <RuxInput
          type='search'
          placeholder='Search'
          size='small'
          className='main-search'
        />
        <RuxContainer className='App-main__container'>
          <ContactsHeader {...{ isOpen, handleAction }} />

          <div className={classNames('App-main__left-panel', { isOpen })}>
            <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

            {view === 'List' ? (
              <ContactsList handleAction={handleAction} />
            ) : (
              <ContactsTimeline handleAction={handleAction} zoom={zoom} />
            )}
          </div>

          <aside className={classNames('App-main__right-panel', { isOpen })}>
            {rigthPanel}
          </aside>
        </RuxContainer>
      </main>
    </>
  );
};

export default App;
