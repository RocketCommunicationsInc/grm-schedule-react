import { RuxButton, RuxContainer, RuxStatus } from '@astrouxds/react';

import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { setDurationMins, setHhMmSs } from 'utils/date';
import { setPassesId } from 'utils/generateOptions';
import SmallReadOnlyInput from 'common/SmallReadOnlyInput/SmallReadOnlyInput';
import './ContactDetails.css';
import { Actions } from 'Types';

type PropTypes = {
  handleAction: (action?: Actions) => void;
};

const ContactDetails = ({ handleAction }: PropTypes) => {
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
    contactREV,
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
        <RuxStatus status={contactStatus} />
        {setPassesId(state.selectedContact)}
      </header>

      <form>
        <SmallReadOnlyInput label='IRON' value={contactName} />
        <SmallReadOnlyInput label='Ground Station' value={contactGround} />
        <SmallReadOnlyInput label='Rev' value={contactREV} />
        <SmallReadOnlyInput label='DOY' value={contactDOY} />
        <SmallReadOnlyInput label='AOS/LOS' value={aosLos} />
        <SmallReadOnlyInput label='Duration' value={durationMins} />
        <SmallReadOnlyInput label='Priority' value={contactPriority} />
        <SmallReadOnlyInput label='Command Mode' value={contactMode} />
        <SmallReadOnlyInput label='Equipment String' value={config} />
        <SmallReadOnlyInput value={contactEquipment} />
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
