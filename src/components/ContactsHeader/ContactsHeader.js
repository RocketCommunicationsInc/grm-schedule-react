import './ContactsHeader.scss';

const ContactsHeader = ({ isOpen, handleAdd }) => (
  <header className='Contacts-header'>
    <h2>Contacts</h2>
    <button onClick={handleAdd}>Add Contact</button>
  </header>
);

export default ContactsHeader;
