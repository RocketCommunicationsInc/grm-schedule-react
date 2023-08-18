import { RuxButton, RuxTextarea } from '@astrouxds/react';
import { setHhMmSs } from 'utils/date';
import { useAppActions } from 'hooks/useAppActions';
import './DeleteConfirmation.css';
import SmallReadOnlyInput from '../../../common/SmallReadOnlyInput/SmallReadOnlyInput';

type PropTypes = {
  contact: any;
  setPendingDelete: any;
  handleClose: () => void;
};

const DeleteConfirmation = ({
  contact,
  setPendingDelete,
  handleClose,
}: PropTypes) => {
  const { deleteContact } = useAppActions();
  const {
    contactName,
    contactGround,
    contactDOY,
    contactBeginTimestamp,
    contactAOS,
    contactLOS,
    contactEndTimestamp,
    contactDetail,
  } = contact;

  const handleDelete = () => {
    deleteContact(contact);
    setPendingDelete(false);
    handleClose();
  };

  return (
    <div className='delete-contact-confirm-wrapper'>
      <p>
        Please confirm if you wish to <strong>DELETE</strong> the following
        contact:
      </p>
      <SmallReadOnlyInput label='IRON' value={contactName} />
      <SmallReadOnlyInput label='Ground Station' value={contactGround} />
      <SmallReadOnlyInput label='DOY' value={contactDOY.toString()} />
      <SmallReadOnlyInput
        label='Pre Pass Start'
        value={setHhMmSs(contactBeginTimestamp)}
      />
      <SmallReadOnlyInput label='AOS' value={setHhMmSs(contactAOS)} />
      <SmallReadOnlyInput label='LOS' value={setHhMmSs(contactLOS)} />
      <SmallReadOnlyInput
        label='Post Pass Stop'
        value={setHhMmSs(contactEndTimestamp)}
      />
      <RuxTextarea disabled label='Notes' value={contactDetail} />
      <div>
        <RuxButton secondary onClick={() => setPendingDelete(false)}>
          Cancel
        </RuxButton>
        <RuxButton onClick={handleDelete}>Delete</RuxButton>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
