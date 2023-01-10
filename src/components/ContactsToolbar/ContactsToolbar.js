import { RuxButton, RuxSegmentedButton, RuxSlider } from '@astrouxds/react';

import './ContactsToolbar.scss';

const labels = [
  { count: 61, label: 'Contacts' },
  { count: 52, label: 'Upcoming' },
  { count: 7, label: 'Executing' },
  { count: 8, label: 'Complete' },
  { count: 0, label: 'Failed' },
];

const ContactsToolbar = ({ setZoom, zoom }) => {
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

        <RuxSegmentedButton
          data={[
            { label: 'List', selected: false },
            { label: 'Timeline', selected: true },
          ]}
        />
      </div>
    </div>
  );
};

export default ContactsToolbar;
