import { RuxButton, RuxContainer, RuxInput, RuxStatus } from '@astrouxds/react';
import './ContactDetails.scss';

const ContactDetails = ({ handleClose, handleModify }) => {
  return (
    <RuxContainer className='Contact-details'>
      <div slot='header'>Contact Details</div>

      <form>
        <h6>
          <RuxStatus status='normal' />
          44855-POGO-14411.06
        </h6>
        <RuxInput label='IRON' readonly value='44855' size='small' />
        <RuxInput label='Ground Station' readonly value='POGO' size='small' />
        <RuxInput label='Rev' readonly value='14411.06' size='small' />
        <RuxInput label='DOY' readonly value='019' size='small' />
        <RuxInput
          label='AOS/LOS'
          readonly
          value='23:44:00 / 24:26:00'
          size='small'
        />
        <RuxInput label='Duration' readonly value='42:00' size='small' />
        <RuxInput label='Priority' readonly value='High' size='small' />
        <RuxInput
          label='Command Mode'
          readonly
          value='Full Automation'
          size='small'
        />
        <RuxInput
          label='Equipment String'
          readonly
          value='Config E'
          size='small'
        />
        <RuxInput
          readonly
          value='ANT88 SAFB1 SFEP204CH1 ECEU6 WS249 USP156'
          size='small'
        />
      </form>

      <div className='footer' slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Cancel
        </RuxButton>
        <RuxButton onClick={handleModify}>Modify Contact</RuxButton>
      </div>
    </RuxContainer>
  );
};

export default ContactDetails;
