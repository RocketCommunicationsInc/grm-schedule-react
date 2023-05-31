import { RuxButton } from '@astrouxds/react';
import './ContactsHeader.css';

type PropTypes = {
  isOpen: boolean;
  handleAction: (e: any) => void;
};

const ContactsHeader = ({ isOpen, handleAction }: PropTypes) => (
  <header slot='header' className='Contacts-header'>
    <h2>Contacts</h2>
    <RuxButton
      icon='chevron-right'
      borderless
      onClick={() => handleAction('manage')}
      disabled={isOpen}
      size='small'
    >
      Manage Contacts
    </RuxButton>
  </header>
);

export default ContactsHeader;
