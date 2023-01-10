import { useMemo, useState } from 'react';

import { groupByToMap, setGroup } from 'utils/grouping';
import data from 'data/contacts.json';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import './App.scss';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');

  const appData = useMemo(() => {
    const ends = data.map((c) => c.contactEndTimestamp);
    const starts = data.map((c) => c.contactBeginTimestamp);

    return {
      contacts: [...data],
      regions: setGroup(groupByToMap([...data], (e) => e.contactGround)),
      start: new Date(Math.min(...starts) * 1000),
      end: new Date(Math.max(...ends) * 1000),
    };
  }, []);

  return (
    <>
      <GlobalStatusBar />
      <main className='App-main'>
        <div className='App-main__container'>
          <ContactsHeader />

          <ContactsToolBar {...{ view, setView, setZoom, zoom, ...appData }} />

          {view === 'List' ? (
            <ContactsList {...appData} />
          ) : (
            <ContactsTimeline {...appData} zoom={zoom} />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
