import './AddContact.scss';

const AddContact = ({ handleClose }) => {
  return (
    <>
      <div className='Add-contact'>
        <header>
          <h2>Add Contact</h2>
        </header>
        <div className='form'>Body</div>
        <footer>
          <button onClick={handleClose}>Close</button>
        </footer>
      </div>
    </>
  );
};

export default AddContact;
