import { useState } from 'react';
import classnames from 'classnames';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import './App.scss';
import ManageContact from './ManageContacts/ManageContact';
import ContactDetails from './ManageContacts/ContactDetails';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleAdd = () => {
    setIsOpen(true);
    setAction('add');
  };

  const handleDetails = () => {
    setIsOpen(true);
    setAction('details');
  };

  const handleModify = () => {
    setIsOpen(true);
    setAction('modify');
  };

  const handleClose = () => {
    setIsOpen(false);
    setAction('');
    setSelectedIndex(-1);
  };

  const handleSelected = (index) => {
    handleDetails();
    setSelectedIndex(index);
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
                <ContactsList
                  handleSelected={handleSelected}
                  selectedIndex={selectedIndex}
                />
              ) : (
                <ContactsTimeline
                  handleSelected={handleSelected}
                  selectedIndex={selectedIndex}
                  zoom={zoom}
                />
              )}
            </div>

            <div className={classnames('App-main__right-panel', { isOpen })}>
              {action === 'details' ? (
                <ContactDetails
                  handleClose={handleClose}
                  handleModify={handleModify}
                />
              ) : (
                <ManageContact action={action} handleClose={handleClose} />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
