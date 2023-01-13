import { useState } from 'react';
import classnames from 'classnames';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import './App.scss';
import AddContact from './ManageContacts/AddContact';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');

  const handleAdd = () => {
    setIsOpen(true);
    setAction('add');
  };

  const handleModify = () => {
    setIsOpen(true);
    setAction('modify');
  };

  const handleClose = () => {
    setIsOpen(false);
    setAction('');
  };

  return (
    <>
      <GlobalStatusBar />
      <main className='App-main'>
        <section className='App-main__container'>
          <ContactsHeader {...{ isOpen, handleAdd }} />

          <div className='App-main__panels'>
            <div className={classnames('App-main__left-panel', { isOpen })}>
              <ContactsToolBar {...{ view, setView, setZoom, zoom }} />

              {view === 'List' ? (
                <ContactsList handleModify={handleModify} />
              ) : (
                <ContactsTimeline handleModify={handleModify} zoom={zoom} />
              )}
            </div>

            <div className={classnames('App-main__right-panel', { isOpen })}>
              {action === 'add' ? (
                <AddContact handleClose={handleClose} />
              ) : (
                <div className='Modify-contact'>
                  <h2>Modify Contact</h2>
                  <div>Body</div>
                  <div>
                    <button onClick={handleClose}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
