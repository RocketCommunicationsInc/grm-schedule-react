import { useMemo } from 'react';
import { RuxButton, RuxSegmentedButton, RuxSlider } from '@astrouxds/react';

import { setLabels } from 'utils/labels';
import './ContactsToolbar.scss';

const ContactsToolbar = ({ contacts, view, setView, setZoom, zoom }) => {
  const labels = useMemo(() => setLabels(contacts), [contacts]);
  const handleZoom = (e) => setZoom(e.target.value);
  const handleZoomIn = () => setZoom((prev) => String(parseInt(prev) + 1));
  const handleZoomOut = () => setZoom((prev) => String(parseInt(prev) - 1));

  return (
    <div className='Contacts-toolbar'>
      <div className='Contacts-toolbar__container'>
        {labels.map(({ count, label }) => (
          <div key={label} className='Contacts-toolbar__label'>
            <h2>{count}</h2>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className='Contacts-toolbar__container'>
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
