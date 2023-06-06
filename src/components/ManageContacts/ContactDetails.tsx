import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxStatus,
} from '@astrouxds/react';

import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import './ContactDetails.css';

type PropTypes = {
  label?: string;
  value: string;
};

const ReadOnlyInput = ({ label, value }: PropTypes) => (
  <RuxInput label={label} readonly value={value} size='small' />
);

const ContactDetails = ({ handleAction }: any) => {
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
        <ReadOnlyInput label='Priority' value={contactPriority} />
        <ReadOnlyInput label='State' value={contactStateCapitalized} />
        <ReadOnlyInput label='IRON' value={contactName} />
        <ReadOnlyInput label='Ground Station' value={contactGround} />
        <ReadOnlyInput label='REV' value={contactREV} />
        <ReadOnlyInput label='DOY' value={contactDOY} />
        <ReadOnlyInput
          label='Start Time'
          value={setHhMmSs(contactBeginTimestamp)}
        />
        <ReadOnlyInput label='AOS' value={setHhMmSs(contactAOS)} />
        <ReadOnlyInput label='LOS' value={setHhMmSs(contactLOS)} />
        <ReadOnlyInput
          label='Stop Time'
          value={setHhMmSs(contactEndTimestamp)}
        />
        <ReadOnlyInput label='Command Mode' value={contactMode} />
        <span className='active-cb'>
          <label>Active</label>
          <RuxCheckbox checked />
        </span>
        <ReadOnlyInput label='Equipment String' value={config} />
        <ReadOnlyInput label='Configuration' value={contactName} />
        <ReadOnlyInput value={contactEquipment} />
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
