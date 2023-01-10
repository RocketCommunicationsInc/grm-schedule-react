import { useState } from 'react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import './App.scss';

const App = () => {
  const [zoom, setZoom] = useState('8');

  return (
    <>
      <GlobalStatusBar />
      <main className='App-main'>
        <div className='App-main__container'>
          <header className='App-main__header'>
            <h2>Contacts</h2>
          </header>

          <ContactsToolBar setZoom={setZoom} zoom={zoom} />

          <ContactsTimeline zoom={zoom} />
        </div>
      </main>
    </>
  );
};

export default App;
