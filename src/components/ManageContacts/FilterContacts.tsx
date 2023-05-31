import { SetStateAction } from 'react';
import { RuxButton, RuxCheckbox, RuxCheckboxGroup, RuxContainer } from '@astrouxds/react';

import { useAppActions } from 'hooks/useAppActions';
import './FilterContacts.css';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
};

const ManageContact = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact } = useAppActions();

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='filter-contact'>
      <header slot='header'>Filter Contacts
      <RuxButton borderless secondary icon='refresh'>Reset Filters</RuxButton>
      </header>

      <label>Priority</label>
      <RuxCheckboxGroup>
        <RuxCheckbox>#High</RuxCheckbox>
        <RuxCheckbox>#Medium</RuxCheckbox>
        <RuxCheckbox>#Low</RuxCheckbox>
      </RuxCheckboxGroup>

      <label>Status</label>
      <RuxCheckboxGroup>
        <RuxCheckbox>Critical</RuxCheckbox>
        <RuxCheckbox>Caution</RuxCheckbox>
        <RuxCheckbox>Normal</RuxCheckbox>
        <RuxCheckbox>Stand By</RuxCheckbox>
      </RuxCheckboxGroup>
      <footer slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ManageContact;
