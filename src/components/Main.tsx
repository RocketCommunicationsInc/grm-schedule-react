import { useState } from 'react';
import { RuxContainer, RuxButton } from '@astrouxds/react';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import ContactDetails from './ManageContacts/ContactDetails/ContactDetails';
import ManageContact from './ManageContacts/ManageContact';
import ManagePanel from './ManageContacts/ManagePanel/ManagePanel';
import FilterContacts from './ManageContacts/FilterContacts/FilterContacts';
import SearchBar from './SearchBar/SearchBar';
import './Main.css';

import type { Actions } from 'Types';

const Main = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<Actions>('');

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
    rightPanel = <ContactDetails handleAction={handleAction} />;
  }

  if (action === 'filter') {
    rightPanel = <FilterContacts action={action} handleAction={handleAction} />;
  }

  if (action === 'add' || action === 'modify') {
    rightPanel = <ManageContact action={action} handleAction={handleAction} />;
  }

  return (
    <main className='App-main'>
      <SearchBar />
      <RuxContainer className='App-main__container'>
        <header slot='header' className='Contacts-header'>
          <h2>Contacts</h2>
          <RuxButton
            icon='chevron-right'
            borderless
            onClick={() => handleAction('manage')}
            disabled={isOpen}
          >
            Manage Contacts
          </RuxButton>
        </header>

        <div className={`App-main__left-panel ${isOpen ? 'isOpen' : ''}`}>
          <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

          {view === 'List' ? (
            <ContactsList handleAction={handleAction} />
          ) : (
            <ContactsTimeline handleAction={handleAction} zoom={zoom} />
          )}
        </div>
        <aside className={`App-main__right-panel ${isOpen ? 'isOpen' : ''}`}>
          {rightPanel}
        </aside>
      </RuxContainer>
    </main>
  );
};

export default Main;
