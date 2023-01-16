import { RuxButton, RuxIcon } from '@astrouxds/react';
import './ContactsHeader.scss';

const ContactsHeader = ({ isOpen, handleAdd }) => (
  <header className='Contacts-header'>
    <h2>Contacts</h2>
    <RuxButton borderless onClick={handleAdd} disabled={isOpen}>
      <RuxIcon icon='add-circle-outline' size='extra-small' />
      Add Contact
    </RuxButton>
  </header>
);

export default ContactsHeader;
