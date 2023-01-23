import { useState } from 'react';
import { RuxButton, RuxContainer } from '@astrouxds/react';

import { generateOptions } from 'utils/generateOptions';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import ManageContactsForm from './ManageContactsForm';
import './ManageContact.scss';

const setDefaultValues = (options) => ({
  doy: options.doy,
  equipment: options.configs[0].value,
  ground: options.grounds[0],
  iron: options.irons[0].toString(),
  pass: options.pass,
  priority: options.priorities[0],
  mode: options.modes[0],
});

const ManageContact = ({ action, handleAction }) => {
  const { addContact, modifyContact } = useAppActions();
  const {
    state: { modifyOptions },
  } = useAppContext();

  const [options, setOptions] = useState(() => generateOptions(modifyOptions));
  const [values, setValues] = useState(() => setDefaultValues(options));
  const isAdd = action === 'add';

  const handleAdd = () => {
    addContact(values);
    const newOptions = generateOptions();
    setOptions(newOptions);
    setValues(setDefaultValues(newOptions));
  };

  const handleModify = () => {
    console.log(values);
  };

  return (
    <RuxContainer className='Manage-contact'>
      <header slot='header'>{isAdd ? 'Add' : 'Modify'} Contact</header>

      <ManageContactsForm {...{ options, values, setValues }} />

      <footer slot='footer'>
        <RuxButton secondary onClick={() => handleAction()}>
          Close
        </RuxButton>
        <RuxButton
          onClick={isAdd ? handleAdd : handleModify}
          disabled={values.pass < 0}
        >
          {isAdd ? 'Add' : 'Modify'} Contact
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ManageContact;
