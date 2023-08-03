import { RuxButton } from '@astrouxds/react';
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
    satellite,
    ground,
    dayOfYear,
    beginTimestamp,
    aos,
    los,
    endTimestamp,
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
      <SmallReadOnlyInput label='IRON' value={satellite} />
      <SmallReadOnlyInput label='Ground Station' value={ground} />
      <SmallReadOnlyInput label='DOY' value={dayOfYear.toString()} />
      <SmallReadOnlyInput
        label='Pre Pass Start'
        value={setHhMmSs(beginTimestamp)}
      />
      <SmallReadOnlyInput label='AOS' value={setHhMmSs(aos)} />
      <SmallReadOnlyInput label='LOS' value={setHhMmSs(los)} />
      <SmallReadOnlyInput
        label='Post Pass Stop'
        value={setHhMmSs(endTimestamp)}
      />
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
