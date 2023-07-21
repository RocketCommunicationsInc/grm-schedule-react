import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxStatus,
} from '@astrouxds/react';
import DeleteConfirmation from '../DeleteContactConfirm/DeleteConfirmation';
import { useAppActions } from 'hooks/useAppActions';
import { setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import SmallReadOnlyInput from 'common/SmallReadOnlyInput/SmallReadOnlyInput';
import { Actions } from 'Types';
import EquipmentIcons from 'common/EquipmentIcons/EquipmentIcons';
import './ContactDetails.css';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  handleAction: (action?: Actions) => void;
  selectedContact: Contact | null;
};

const ContactDetails = ({ handleAction, selectedContact }: PropTypes) => {
  const [pendingDelete, setPendingDelete] = useState(false);
  const { resetSelectedContact } = useAppActions();
  // const { state } = useAppContext();
  if (!selectedContact) return null;

  const {
    aos,
    dayOfYear,
    equipment,
    ground,
    los,
    mode,
    satellite,
    priority,
    rev,
    status,
    state,
    beginTimestamp,
    endTimestamp,
  } = selectedContact;

  const contactStateCapitalized =
    state.charAt(0).toUpperCase() + state.slice(1);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='Contact-details'>
      <header slot='header'>
        <RuxStatus status={status} />
        {setPassesId(selectedContact)}
      </header>
      {pendingDelete ? (
        <DeleteConfirmation
          contact={selectedContact}
          setPendingDelete={setPendingDelete}
          handleClose={handleClose}
        />
      ) : (
        <>
          <form>
            <SmallReadOnlyInput label='Priority' value={priority} />
            <SmallReadOnlyInput label='State' value={contactStateCapitalized} />
            <SmallReadOnlyInput label='IRON' value={satellite} />
            <SmallReadOnlyInput label='Ground Station' value={ground} />
            <SmallReadOnlyInput label='REV' value={rev.toString()} />
            <SmallReadOnlyInput label='DOY' value={dayOfYear.toString()} />
            <SmallReadOnlyInput
              label='Start Time'
              value={setHhMmSs(beginTimestamp)}
            />
            <SmallReadOnlyInput label='AOS' value={setHhMmSs(aos)} />
            <SmallReadOnlyInput label='LOS' value={setHhMmSs(los)} />
            <SmallReadOnlyInput
              label='Stop Time'
              value={setHhMmSs(endTimestamp)}
            />
            <SmallReadOnlyInput label='Command Mode' value={mode} />
            <span className='active-cb'>
              <label>Active</label>
              <RuxCheckbox checked />
            </span>
            <RuxContainer>
              <div slot='header'>Equipment String</div>
              <SmallReadOnlyInput label='Configuration' value={'Config A'} />
              <label>{equipment}</label>
              <EquipmentIcons equipmentString={equipment} />
            </RuxContainer>
          </form>
          <footer slot='footer'>
            <RuxButton secondary onClick={() => setPendingDelete(true)}>
              Delete
            </RuxButton>
            <RuxButton secondary onClick={handleClose}>
              Cancel
            </RuxButton>
            <RuxButton onClick={() => handleAction('modify')}>Modify</RuxButton>
          </footer>
        </>
      )}
    </RuxContainer>
  );
};

export default ContactDetails;
