import { RuxContainer } from '@astrouxds/react';
import './AddContact.scss';

const AddContact = ({ handleClose }) => {
  return (
    <RuxContainer>
      <div slot='header'>
        <h2>Add Contact</h2>
      </div>
      <form>Body</form>
      <div slot='footer'>
        <button onClick={handleClose}>Close</button>
      </div>
    </RuxContainer>
  );
};

export default AddContact;
