import { useState } from 'react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import './App.scss';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');

  return (
    <>
      <GlobalStatusBar />
      <main className='App-main'>
        <section className='App-main__container'>
          <ContactsHeader />

          <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

          {view === 'List' ? (
            <ContactsList />
          ) : (
            <ContactsTimeline zoom={zoom} />
          )}
        </section>
      </main>
    </>
  );
};

export default App;
