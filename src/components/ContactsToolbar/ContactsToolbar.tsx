import { RuxButton, RuxSegmentedButton, RuxSlider } from '@astrouxds/react';
// import { setLabels } from 'utils/labels';
import { getDayOfYear } from 'utils/date';
import { useAppContext } from 'providers/AppProvider';
import './ContactsToolbar.css';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  filteredContacts: Contact[];
  view: any;
  setView: (e: any) => void;
  setZoom: (e: any) => void;
  zoom: any;
};

const ContactsToolbar = ({
  filteredContacts,
  view,
  setView,
  setZoom,
  zoom,
}: PropTypes) => {
  const { state } = useAppContext();
  // const labels = setLabels(state.searchedContacts);
  // const searchedContacts = state.searchedContacts as Contact[];
  const handleZoom = (e: any) => setZoom(e.target.value);
  const handleZoomIn = () =>
    setZoom((prev: string) => String(parseInt(prev) + 1));
  const handleZoomOut = () =>
    setZoom((prev: string) => String(parseInt(prev) - 1));

  const upcomingContacts = filteredContacts.filter(
    (c) => c.state === 'upcoming'
  );
  const executingContacts = filteredContacts.filter(
    (c) => c.state === 'executing'
  );
  const completeContacts = filteredContacts.filter(
    (c) => c.state === 'complete'
  );
  const failedContacts = filteredContacts.filter((c) => c.state === 'failed');

  return (
    <div className='Contacts-toolbar'>
      <div className='Contacts-toolbar__container'>
        <div className='Contacts-toolbar__time-box'>
          <span>{state.start.getFullYear()}</span>
          <span>{getDayOfYear(state.start)}</span>
          <span>
            {String(state.start.getHours()).padStart(2, '0')}
            {':'}
            {String(state.start.getMinutes()).padStart(2, '0')}
          </span>
        </div>
        <p>to</p>
        <div className='Contacts-toolbar__time-box'>
          <span>{state.end.getFullYear()}</span>
          <span>{getDayOfYear(state.end)}</span>
          <span>
            {String(state.end.getHours()).padStart(2, '0')}
            {':'}
            {String(state.end.getMinutes()).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className='Contacts-toolbar__container'>
        <div className='Contacts-toolbar__label'>
          <h2>{filteredContacts.length}</h2>
          <p>{'Contacts'}</p>
        </div>
        <div className='Contacts-toolbar__label'>
          <h2>{upcomingContacts.length}</h2>
          <p>{'Upcoming'}</p>
        </div>
        <div className='Contacts-toolbar__label'>
          <h2>{executingContacts.length}</h2>
          <p>{'Executing'}</p>
        </div>
        <div className='Contacts-toolbar__label'>
          <h2>{completeContacts.length}</h2>
          <p>{'Complete'}</p>
        </div>
        <div className='Contacts-toolbar__label'>
          <h2>{failedContacts.length}</h2>
          <p>{'Failed'}</p>
        </div>
      </div>

      <div className='Contacts-toolbar__container flex-end'>
        {view === 'Timeline' && (
          <div className='Contacts-toolbar__zoom'>
            <RuxButton
              icon='remove'
              iconOnly
              borderless
              disabled={parseInt(zoom) <= 4}
              onClick={handleZoomOut}
            />
            <RuxSlider onRuxchange={handleZoom} min={4} max={12} value={zoom} />
            <RuxButton
              icon='add'
              iconOnly
              borderless
              disabled={parseInt(zoom) >= 12}
              onClick={handleZoomIn}
            />
          </div>
        )}

        <RuxSegmentedButton
          onRuxchange={(e) => setView(e.detail)}
          data={[
            { label: 'List', selected: view === 'List' },
            { label: 'Timeline', selected: view === 'Timeline' },
          ]}
        />
      </div>
    </div>
  );
};

export default ContactsToolbar;
