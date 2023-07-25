import { useState } from 'react';
import { RuxContainer, RuxNotification } from '@astrouxds/react';

import { useAppActions } from 'hooks/useAppActions';
import { useAppContext } from 'providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './components/ContactsHeader/ContactsHeader';
import ContactsToolBar from './components/ContactsToolbar/ContactsToolbar';
import ContactsTable from './components/ContactsTable/ContactsTable';
import ContactsTimeline from './components/ContactsTimeline/ContactsTimeline';
import ContactDetails from './components/ManageContacts/ContactDetails/ContactDetails';
import ManageContact from './components/ManageContacts/ManageContact';
import ManagePanel from './components/ManageContacts/ManagePanel/ManagePanel';
import FilterContacts from './components/ManageContacts/FilterContacts/FilterContacts';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import type { Contact } from '@astrouxds/mock-data';

import type { Actions } from 'Types';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<Actions>('');
  const { resetNotification } = useAppActions();
  const { state } = useAppContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleAction = (action?: Actions) => {
    if (action) {
      setIsOpen(true);
      setAction(action);
      return;
    }

    setIsOpen(false);
    setAction('');
  };

  let rightPanel = null;

  if (action === 'manage') {
    rightPanel = <ManagePanel handleAction={handleAction} />;
  }

  if (action === 'details') {
    rightPanel = (
      <ContactDetails
        handleAction={handleAction}
        selectedContact={selectedContact}
      />
    );
  }

  if (action === 'filter') {
    rightPanel = <FilterContacts action={action} handleAction={handleAction} />;
  }

  if (action === 'add' || action === 'modify') {
    rightPanel = <ManageContact action={action} handleAction={handleAction} />;
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
      <main className='App-main'>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <RuxContainer className='App-main__container'>
          <ContactsHeader {...{ isOpen, handleAction }} />

          <div className={`App-main__left-panel ${isOpen ? 'isOpen' : ''}`}>
            <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

            {view === 'List' ? (
              <ContactsTable
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleAction={handleAction}
                setSelectedContact={setSelectedContact}
              />
            ) : (
              <ContactsTimeline
                selectedContact={selectedContact}
                searchValue={searchValue}
                handleAction={handleAction}
                zoom={zoom}
              />
            )}
          </div>
          <aside className={`App-main__right-panel ${isOpen ? 'isOpen' : ''}`}>
            {rightPanel}
          </aside>
        </RuxContainer>
      </main>
    </>
  );
};

export default App;
