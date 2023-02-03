import { RuxButton, RuxContainer, RuxInput, RuxStatus } from '@astrouxds/react';

import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { setDurationMins, setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import './ContactDetails.scss';

const ReadOnlyInput = ({ label, value }) => (
  <RuxInput label={label} readonly value={value} size='small' />
);

const ContactDetails = ({ handleAction }) => {
  const { resetSelectedContact } = useAppActions();
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
    contactSatellite,
    contactStatus,
  } = state.selectedContact;
  const aosLos = `${setHhMmSs(contactAOS)} / ${setHhMmSs(contactLOS)}`;
  const durationMins = setDurationMins(contactAOS, contactLOS);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='Contact-details'>
      <header slot='header'>
        <h2>Contact Details</h2>
      </header>

      <form>
        <h6>
          <RuxStatus status={contactStatus} />
          {setPassesId(state.selectedContact)}
        </h6>

        <ReadOnlyInput label='IRON' value={contactName} />
        <ReadOnlyInput label='Ground Station' value={contactGround} />
        <ReadOnlyInput label='Rev' value={contactSatellite} />
        <ReadOnlyInput label='DOY' value={contactDOY} />
        <ReadOnlyInput label='AOS/LOS' value={aosLos} />
        <ReadOnlyInput label='Duration' value={durationMins} />
        <ReadOnlyInput label='Priority' value={contactPriority} />
        <ReadOnlyInput label='Command Mode' value={contactMode} />
        <ReadOnlyInput label='Equipment String' value={config} />
        <ReadOnlyInput value={contactEquipment} />
      </form>

      <footer slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Cancel
        </RuxButton>
        <RuxButton onClick={() => handleAction('modify')}>
          Modify Contact
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ContactDetails;
