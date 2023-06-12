import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxStatus,
} from '@astrouxds/react';

import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import SmallReadOnlyInput from 'common/SmallReadOnlyInput/SmallReadOnlyInput';
import './ContactDetails.css';
import { Actions } from 'Types';

type PropTypes = {
  handleAction: (action?: Actions) => void;
};

const ContactDetails = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact, deleteContact } = useAppActions();
  const { state } = useAppContext();
  const {
    contactAOS,
    contactDOY,
    contactEquipment,
    contactEquipmentConfig: config,
    contactGround,
    contactLOS,
    contactMode,
    contactName,
    contactPriority,
    contactREV,
    contactStatus,
    contactState,
    contactBeginTimestamp,
    contactEndTimestamp,
  } = state.selectedContact;

  const contactStateCapitalized =
    contactState.charAt(0).toUpperCase() + contactState.slice(1);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  const handleDelete = () => {
    deleteContact(state.selectedContact);
    handleClose();
  };

  return (
    <RuxContainer className='Contact-details'>
      <header slot='header'>
        <RuxStatus status={contactStatus} />
        {setPassesId(state.selectedContact)}
      </header>

      <form>
        <SmallReadOnlyInput label='Priority' value={contactPriority} />
        <SmallReadOnlyInput label='State' value={contactStateCapitalized} />
        <SmallReadOnlyInput label='IRON' value={contactName} />
        <SmallReadOnlyInput label='Ground Station' value={contactGround} />
        <SmallReadOnlyInput label='REV' value={contactREV} />
        <SmallReadOnlyInput label='DOY' value={contactDOY} />
        <SmallReadOnlyInput
          label='Start Time'
          value={setHhMmSs(contactBeginTimestamp)}
        />
        <SmallReadOnlyInput label='AOS' value={setHhMmSs(contactAOS)} />
        <SmallReadOnlyInput label='LOS' value={setHhMmSs(contactLOS)} />
        <SmallReadOnlyInput
          label='Stop Time'
          value={setHhMmSs(contactEndTimestamp)}
        />
        <SmallReadOnlyInput label='Command Mode' value={contactMode} />
        <span className='active-cb'>
          <label>Active</label>
          <RuxCheckbox checked />
        </span>
        <SmallReadOnlyInput label='Equipment String' value={config} />
        <SmallReadOnlyInput label='Configuration' value={contactName} />
        <SmallReadOnlyInput value={contactEquipment} />
      </form>

      <footer slot='footer'>
        <RuxButton size='small' secondary onClick={handleDelete}>
          Delete
        </RuxButton>
        <RuxButton size='small' secondary onClick={handleClose}>
          Cancel
        </RuxButton>
        <RuxButton size='small' onClick={() => handleAction('modify')}>
          Modify
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ContactDetails;
