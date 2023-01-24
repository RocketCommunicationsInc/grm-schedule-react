import { RuxButton } from '@astrouxds/react';
import './ContactsHeader.scss';

const ContactsHeader = ({ isOpen, handleAction }) => (
  <header className='Contacts-header'>
    <h2>Contacts</h2>
    <RuxButton
      icon='add'
      borderless
      onClick={() => handleAction('add')}
      disabled={isOpen}
    >
      Add Contact
    </RuxButton>
  </header>
);

export default ContactsHeader;
