import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxStatus,
} from '@astrouxds/react';
import DeleteConfirmation from '../DeleteContactConfirm/DeleteConfirmation';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import { randomInt } from 'utils/random';
import SmallReadOnlyInput from 'common/SmallReadOnlyInput/SmallReadOnlyInput';
import { Actions } from 'Types';
import EquipmentIcons from 'common/EquipmentIcons/EquipmentIcons';
import './ContactDetails.css';

type PropTypes = {
  handleAction: (action?: Actions) => void;
};

const ContactDetails = ({ handleAction }: PropTypes) => {
  const [pendingDelete, setPendingDelete] = useState(false);
  const { resetSelectedContact } = useAppActions();
  const { state: store } = useAppContext();
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
  } = store.selectedContact;

  const stateCapitalized = state.charAt(0).toUpperCase() + state.slice(1);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='Contact-details'>
      <header slot='header'>
        <RuxStatus status={status} />
        {setPassesId(store.selectedContact)}
      </header>
      {pendingDelete ? (
        <DeleteConfirmation
          contact={store.selectedContact}
          setPendingDelete={setPendingDelete}
          handleClose={handleClose}
        />
      ) : (
        <>
          <form>
            <SmallReadOnlyInput label='Priority' value={priority} />
            <SmallReadOnlyInput label='State' value={stateCapitalized} />
            <SmallReadOnlyInput label='IRON' value={satellite} />
            <SmallReadOnlyInput label='Ground Station' value={ground} />
            <SmallReadOnlyInput label='REV' value={rev} />
            <SmallReadOnlyInput label='DOY' value={dayOfYear} />
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
              <SmallReadOnlyInput
                label='Configuration'
                value={`Config ${randomInt(1, 5)}`}
              />
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
