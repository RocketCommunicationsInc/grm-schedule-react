import {
  RuxButton,
  RuxContainer,
  RuxInput,
  RuxOption,
  RuxSelect,
} from '@astrouxds/react';
import './AddContact.scss';

const AddContact = ({ handleClose }) => {
  return (
    <RuxContainer className='Add-contact'>
      <div slot='header'>Add Contact</div>
      <form>
        <h6>1. Choose a Contact to Reserve</h6>

        <div className='section-wrapper'>
          <RuxSelect label='IRON' size='small'>
            <RuxOption label='Any' />
            <RuxOption label='36372' />
            <RuxOption label='67985' />
            <RuxOption label='78957' />
          </RuxSelect>
          <RuxSelect label='Ground Station' size='small'>
            <RuxOption label='Any' />
            <RuxOption label='HULA' />
            <RuxOption label='COOK' />
            <RuxOption label='POGO' />
          </RuxSelect>
          <RuxSelect label='DOY' disabled size='small'>
            <RuxOption label='016' />
          </RuxSelect>

          <div className='Contact-list'>
            <div className='Contact-list__header'>
              <span>Contact</span>
              <span>AOS</span>
              <span>LOS</span>
            </div>
            <ul className='Contact-list__passes'>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
              <li>
                <span>44855-GUAM-14391.45</span>
                <span>17:15:00</span>
                <span>17:34:00</span>
              </li>
            </ul>
          </div>
        </div>

        <h6>2. Configure Reservation Options</h6>

        <div className='section-wrapper'>
          <RuxSelect label='Priority' size='small'>
            <RuxOption label='Low' />
            <RuxOption label='Medium' />
            <RuxOption label='High' />
          </RuxSelect>
          <RuxSelect label='Command Mode' size='small'>
            <RuxOption label='Full Automation' />
            <RuxOption label='Semi-Automation' />
            <RuxOption label='Manual' />
          </RuxSelect>
          <RuxSelect label='Equipment String' size='small'>
            <RuxOption label='Config A' />
            <RuxOption label='Config B' />
            <RuxOption label='Config C' />
            <RuxOption label='Config D' />
            <RuxOption label='Config E' />
          </RuxSelect>
          <RuxInput
            readonly
            value='ANT43 VAFB1 SFEP227CH1 ECEU6 WS402 USP177'
          />
        </div>
      </form>
      <div className='footer' slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
        <RuxButton disabled>Add Contact</RuxButton>
      </div>
    </RuxContainer>
  );
};

export default AddContact;
