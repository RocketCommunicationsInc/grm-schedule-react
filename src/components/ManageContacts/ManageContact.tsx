import { useState } from 'react';
import { RuxButton, RuxContainer, RuxIcon } from '@astrouxds/react';

import { generateOptions } from 'utils/generateOptions';
import { randomInt } from 'utils/random';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import ModifyContactForm from './ModifyContactForm';
import DiscardChanges from '../../common/DiscardChanges/DiscardChanges';
import './ManageContact.css';
import type { DefaulOptions, Actions } from 'Types';
import AddContactConfirm from './AddContactConfirm/AddContactConfirm';
import AddContactForm from './AddContact';

type PropTypes = {
  action: any;
  handleAction: (action?: Actions) => void;
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
  state: options.state[0],
});

const ManageContact = ({ action, handleAction }: PropTypes) => {
  const { addContact, modifyContact, resetSelectedContact } = useAppActions();
  const {
    state: { selectedContact, modifyOptions },
  } = useAppContext();

  const [options, setOptions] = useState(() => generateOptions(modifyOptions));
  const [values, setValues] = useState(() => setDefaultValues(options));
  const [verifyDiscard, setVerifyDiscard] = useState(false);
  const [showAddConfirm, setShowAddConfirm] = useState(false);
  const isAdd = action === 'add';

  const handleAdd = () => {
    addContact(values);
    handleAction('manage');
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
      contactState: values.state,
    };

    modifyContact(modifiedContact);
    handleAction();
  };

  const handleClose = (verifyPanel: boolean) => {
    if (verifyPanel && ((isAdd && values.pass >= 0) || values.dirty)) {
      setVerifyDiscard(true);
    } else {
      isAdd ? handleAction('manage') : handleAction();
      resetSelectedContact();
    }
  };

  return (
    <RuxContainer className='Manage-contact'>
      <header slot='header'>
        <RuxIcon
          icon='arrow-back'
          size='1.5rem'
          onClick={() => handleClose(true)}
        />
        {isAdd ? 'Add' : 'Modify'}
        &nbsp;Contact
      </header>

      {!verifyDiscard && !showAddConfirm ? (
        <>
          {isAdd ? (
            <AddContactForm {...{ options, values, setValues }} />
          ) : (
            <ModifyContactForm {...{ options, values, setValues }} />
          )}

          <footer slot='footer'>
            <RuxButton size='small' secondary onClick={() => handleClose(true)}>
              Cancel
            </RuxButton>
            <RuxButton
              size='small'
              onClick={() => {
                isAdd ? setShowAddConfirm(true) : handleModify();
              }}
              disabled={isAdd ? values.pass < 0 : !values.dirty}
            >
              {isAdd ? 'Add' : 'Modify'} Contact
            </RuxButton>
          </footer>
        </>
      ) : showAddConfirm ? (
        <AddContactConfirm
          values={values}
          options={options}
          handleAdd={handleAdd}
          setShowAddConfirm={setShowAddConfirm}
        />
      ) : (
        <DiscardChanges
          setVerifyDiscard={setVerifyDiscard}
          handleClose={handleClose}
        />
      )}
    </RuxContainer>
  );
};

export default ManageContact;
