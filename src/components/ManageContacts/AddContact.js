import { useState } from 'react';
import {
  RuxButton,
  RuxContainer,
  RuxDatetime,
  RuxInput,
  RuxOption,
  RuxSelect,
} from '@astrouxds/react';

import { generateOptions } from 'utils/generateOptions';
import { useAppActions } from 'hooks/useAppActions';
import './AddContact.scss';

const setDefaultValues = (options) => ({
  doy: options.doy,
  equipment: options.configs[0].value,
  ground: options.grounds[0],
  iron: options.irons[0].toString(),
  pass: -1,
  priority: options.priorities[0],
  mode: options.modes[0],
});

const AddContact = ({ handleClose }) => {
  const { addContact } = useAppActions();
  const [options, setOptions] = useState(() => generateOptions());
  const [values, setValues] = useState(() => setDefaultValues(options));

  const handleSubmit = () => {
    addContact(values);
    const newOptions = generateOptions();
    setOptions(newOptions);
    setValues(setDefaultValues(newOptions));
  };

  const handleSelectPass = (i) => {
    setValues((prev) => ({
      ...prev,
      pass: prev.pass === i ? -1 : i,
    }));
  };

  const handleSelect = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <RuxContainer className='Add-contact'>
      <div slot='header'>Add Contact</div>
      <form>
        <h6>1. Choose a Contact to Reserve</h6>

        <div className='section-wrapper'>
          <RuxSelect
            label='IRON'
            size='small'
            onRuxchange={(e) => handleSelect('iron', e.target.value)}
          >
            {options.irons.map((iron) => (
              <RuxOption key={iron} label={iron} value={iron} />
            ))}
          </RuxSelect>

          <RuxSelect
            label='Ground Station'
            size='small'
            onRuxchange={(e) => handleSelect('ground', e.target.value)}
          >
            {options.grounds.map((ground) => (
              <RuxOption key={ground} label={ground} value={ground} />
            ))}
          </RuxSelect>

          <RuxSelect label='DOY' disabled size='small'>
            <RuxOption label={options.doy} value={options.doy} />
          </RuxSelect>

          <div className='Contact-list'>
            <div className='Contact-list__header'>
              <span>Contact</span>
              <span>AOS</span>
              <span>LOS</span>
            </div>

            <ul className='Contact-list__passes'>
              {options.passes.map(({ id, aos, los }, i) => (
                <li
                  key={id + i}
                  className={values.pass === i ? 'selected' : undefined}
                  onClick={() => handleSelectPass(i)}
                >
                  <span>{id}</span>
                  <RuxDatetime
                    date={aos}
                    hour='2-digit'
                    minute='2-digit'
                    second='2-digit'
                  />
                  <RuxDatetime
                    date={los}
                    hour='2-digit'
                    minute='2-digit'
                    second='2-digit'
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h6>2. Configure Reservation Options</h6>

        <div className='section-wrapper'>
          <RuxSelect
            label='Priority'
            size='small'
            onRuxchange={(e) => handleSelect('priority', e.target.value)}
          >
            {options.priorities.map((priority) => (
              <RuxOption key={priority} label={priority} value={priority} />
            ))}
          </RuxSelect>

          <RuxSelect
            label='Command Mode'
            size='small'
            onRuxchange={(e) => handleSelect('mode', e.target.value)}
          >
            {options.modes.map((mode) => (
              <RuxOption key={mode} label={mode} value={mode} />
            ))}
          </RuxSelect>

          <RuxSelect
            label='Equipment String'
            size='small'
            onRuxchange={(e) => handleSelect('equipment', e.target.value)}
          >
            {options.configs.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>

          <RuxInput size='small' readonly value={values.equipment} />
        </div>
      </form>

      <div className='footer' slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
        <RuxButton onClick={handleSubmit} disabled={values.pass < 0}>
          Add Contact
        </RuxButton>
      </div>
    </RuxContainer>
  );
};

export default AddContact;
