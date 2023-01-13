import { RuxButton, RuxSegmentedButton, RuxSlider } from '@astrouxds/react';

import { setLabels } from 'utils/labels';
import { getDayOfYear } from 'utils/date';
import { useAppContext } from 'providers/AppProvider';
import './ContactsToolbar.scss';

const ContactsToolbar = ({ view, setView, setZoom, zoom }) => {
  const { state } = useAppContext();
  const labels = setLabels(state.contacts);
  const handleZoom = (e) => setZoom(e.target.value);
  const handleZoomIn = () => setZoom((prev) => String(parseInt(prev) + 1));
  const handleZoomOut = () => setZoom((prev) => String(parseInt(prev) - 1));

  return (
    <div className='Contacts-toolbar'>
      <div className='Contacts-toolbar__container flex-start gap-3'>
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
        {labels.map(({ count, label }) => (
          <div key={label} className='Contacts-toolbar__label'>
            <h2>{count}</h2>
            <p>{label}</p>
          </div>
        ))}
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
