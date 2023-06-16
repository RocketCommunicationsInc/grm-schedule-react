import { SetStateAction } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxCheckboxGroup,
  RuxContainer,
  RuxIcon,
  RuxInput,
  RuxStatus,
} from '@astrouxds/react';
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
      <header slot='header'>
        <RuxIcon icon='arrow-back' size='1.5rem' onClick={handleClose} />
        Filter Contacts
        <RuxButton borderless secondary icon='refresh'>
          Reset Filters
        </RuxButton>
      </header>

      <RuxCheckboxGroup label='Priority'>
        <RuxCheckbox label='# High 1 - 66' />
        <RuxCheckbox label='# Medium 67 - 133' />
        <RuxCheckbox label='# Low 134 - 200' />
      </RuxCheckboxGroup>

      <RuxCheckboxGroup label='Status'>
        <RuxCheckbox>
          <RuxStatus status='critical' />
          Critical
        </RuxCheckbox>
        <RuxCheckbox>
          <RuxStatus status='caution' />
          Caution
        </RuxCheckbox>
        <RuxCheckbox>
          <RuxStatus status='normal' />
          Normal
        </RuxCheckbox>
        <RuxCheckbox>
          <RuxStatus status='standby' />
          Stand By
        </RuxCheckbox>
      </RuxCheckboxGroup>

      <RuxInput
        type='search'
        label='IRON'
        placeholder='All IRONs'
        size='small'
      />

      <RuxCheckboxGroup label='Ground Station'>
        <RuxCheckbox label='LION-A' />
        <RuxCheckbox label='PUMA-C' />
        <RuxCheckbox label='TIGER-B' />
      </RuxCheckboxGroup>

      <RuxCheckboxGroup label='State'>
        <RuxCheckbox label='Upcoming' />
        <RuxCheckbox label='Executing' />
        <RuxCheckbox label='Complete' />
        <RuxCheckbox label='Failed' />
      </RuxCheckboxGroup>

      <RuxInput
        type='search'
        label='Equipment String'
        placeholder='All Equipment'
        size='small'
      />
    </RuxContainer>
  );
};

export default ManageContact;
