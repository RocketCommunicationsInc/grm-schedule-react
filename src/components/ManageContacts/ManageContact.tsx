import { SetStateAction, useState } from 'react';
import { RuxButton, RuxContainer, RuxIcon } from '@astrouxds/react';

import { generateOptions } from 'utils/generateOptions';
import { randomInt } from 'utils/random';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import ManageContactsForm from './ManageContactsForm';
import './ManageContact.css';
import { DefaulOptions } from 'Types';

type PropTypes = {
  action: any;
  handleAction: (action?: SetStateAction<any>) => void;
};
const setDefaultValues = (options: DefaulOptions) => ({
  doy: options.doy,
  equipment: options.configs[0].value,
  ground: options.grounds[0],
  iron: options.irons[0].toString(),
  pass: options.pass,
  priority: options.priorities[0],
  mode: options.modes[0],
  dirty: false,
});

const ManageContact = ({ action, handleAction }: PropTypes) => {
  const { addContact, modifyContact, resetSelectedContact } = useAppActions();
  const {
    state: { selectedContact, modifyOptions },
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
    const { aos, los, id } = options.passes[values.pass as any];
    const contactAOS = new Date(aos).getTime();
    const contactLOS = new Date(los).getTime();

    const modifiedContact = {
      ...selectedContact,
      contactAOS,
      contactLOS,
      contactBeginTimestamp: contactAOS,
      contactEndTimestamp: contactLOS,
      contactDOY: values.doy,
      contactEquipment: values.equipment,
      contactEquipmentConfig: `Config ${randomInt(1, 5)}`,
      contactGround: values.ground,
      contactMode: values.mode,
      contactName: parseInt(values.iron),
      contactPriority: values.priority,
      contactSatellite: id.split(' ')[0],
    };

    modifyContact(modifiedContact);
    handleAction();
  };

  const handleClose = () => {
    // TODO: Add form verification of changes
    isAdd ? handleAction('manage') : handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='Manage-contact'>
      <header slot='header'>
        <RuxIcon icon='arrow-back' size='1.5rem' onClick={handleClose} />
        {isAdd ? 'Add' : 'Modify'}
        &nbsp;Contact
      </header>

      <ManageContactsForm {...{ options, values, setValues }} />

      <footer slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Cancel
        </RuxButton>
        <RuxButton
          onClick={isAdd ? handleAdd : handleModify}
          disabled={isAdd ? values.pass < 0 : !values.dirty}
        >
          {isAdd ? 'Add' : 'Modify'} Contact
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ManageContact;
