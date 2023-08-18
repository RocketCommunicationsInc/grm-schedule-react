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
import { useAppContext } from 'providers/AppProvider';

const Main = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [action, setAction] = useState<Actions>('');
  const { state } = useAppContext();

  const handleAction = (action?: Actions) => {
    if (action) {
      setAction(action);
      return;
    }

    setAction('');
  };

  const rightPanelMap = {
    manage: <ManagePanel handleAction={handleAction} />,
    details: <ContactDetails handleAction={handleAction} />,
    filter: <FilterContacts action={action} handleAction={handleAction} />,
    add: <ManageContact action={action} handleAction={handleAction} />,
    modify: <ManageContact action={action} handleAction={handleAction} />,
  };
  const RightPanel = action ? rightPanelMap[action] : null;

  return (
    <main className='App-main'>
      <SearchBar />
      <RuxContainer className='App-main__container'>
        <header slot='header'>
          <h2>Contacts</h2>
          <RuxButton
            icon='chevron-right'
            borderless
            onClick={() => handleAction('manage')}
            disabled={action !== ''}
          >
            Manage Contacts
          </RuxButton>
        </header>

        <div
          className={`App-main__left-panel ${action !== '' ? 'isOpen' : ''}`}
        >
          <ContactsToolBar {...{ view, setView, setZoom, zoom }} />
          {state.searchedContacts.length <= 0 ? (
            <p className='no-contacts-found'>
              No contacts available. Try changing the duration or filters if
              applied.
            </p>
          ) : view === 'List' ? (
            <ContactsList handleAction={handleAction} />
          ) : (
            <ContactsTimeline handleAction={handleAction} zoom={zoom} />
          )}
        </div>
        <aside
          className={`App-main__right-panel ${action !== '' ? 'isOpen' : ''}`}
        >
          {RightPanel}
        </aside>
      </RuxContainer>
    </main>
  );
};

export default Main;
