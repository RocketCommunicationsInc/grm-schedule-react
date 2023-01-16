import { RuxButton } from '@astrouxds/react';
import './ContactsHeader.scss';

const ContactsHeader = ({ isOpen, handleAdd }) => (
  <header className='Contacts-header'>
    <h2>Contacts</h2>
    <RuxButton borderless onClick={handleAdd} disabled={isOpen}>
      Add Contact
    </RuxButton>
  </header>
);

export default ContactsHeader;
