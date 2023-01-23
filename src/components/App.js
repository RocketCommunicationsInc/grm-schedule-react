import { useEffect, useState } from 'react';
import classnames from 'classnames';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsToolBar from './ContactsToolbar/ContactsToolbar';
import ContactsList from './ContactsList/ContactsList';
import ContactsTimeline from './ContactsTimeline/ContactsTimeline';
import ContactDetails from './ManageContacts/ContactDetails';
import ManageContact from './ManageContacts/ManageContact';
import './App.scss';
import { useAppContext } from 'providers/AppProvider';

const App = () => {
  const [zoom, setZoom] = useState('8');
  const [view, setView] = useState('List');
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { state } = useAppContext();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleAction = (action) => {
    if (action) {
      setIsOpen(true);
      setAction(action);
      return;
    }

    setIsOpen(false);
    setAction('');
    setSelectedIndex(-1);
  };

  const handleSelected = (index) => {
    handleDetails();
    setSelectedIndex(index);
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
      <main className='App-main'>
        <section className='App-main__container'>
          <ContactsHeader {...{ isOpen, handleAction }} />

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
              {rigthPanel}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
