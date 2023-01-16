import {
  RuxButton,
  RuxContainer,
  RuxInput,
  RuxOption,
  RuxSelect,
} from '@astrouxds/react';

const AddContact = ({ handleClose }) => {
  return (
    <RuxContainer>
      <div slot='header'>
        <h2>Add Contact</h2>
      </div>
      <form>
        <h4>1. Choose a Contact to Reserve</h4>

        <RuxSelect label='IRON'>
          <RuxOption label='Any' />
          <RuxOption label='36372' />
          <RuxOption label='67985' />
          <RuxOption label='78957' />
        </RuxSelect>
        <RuxSelect label='Ground Station'>
          <RuxOption label='Any' />
          <RuxOption label='HULA' />
          <RuxOption label='COOK' />
          <RuxOption label='POGO' />
        </RuxSelect>
        <RuxSelect label='DOY' disabled>
          <RuxOption label='016' />
        </RuxSelect>

        <h4>2. Configure Reservation Options</h4>

        <RuxSelect label='Priority'>
          <RuxOption label='Low' />
          <RuxOption label='Medium' />
          <RuxOption label='High' />
        </RuxSelect>
        <RuxSelect label='Command Mode'>
          <RuxOption label='Full Automation' />
          <RuxOption label='Semi-Automation' />
          <RuxOption label='Manual' />
        </RuxSelect>
        <RuxSelect label='Equipment String'>
          <RuxOption label='Config A' />
          <RuxOption label='Config B' />
          <RuxOption label='Config C' />
          <RuxOption label='Config D' />
          <RuxOption label='Config E' />
        </RuxSelect>
        <RuxInput readonly value='ANT43 VAFB1 SFEP227CH1 ECEU6 WS402 USP177' />
      </form>
      <div slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
        <RuxButton disabled>Add Contact</RuxButton>
      </div>
    </RuxContainer>
  );
};

export default AddContact;
