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
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import './FilterContacts.css';
import { ContactState, GroundStation, Priority } from 'Types';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
};

const ManageContact = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact, filterContacts } = useAppActions();
  const { state } = useAppContext();

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  const priority: Priority = state.contacts.map(
    (contact: { contactPriority: any }) => contact.contactPriority
  );

  const cState: ContactState = state.contacts.map(
    (contact: { contactState: any }) => contact.contactState
  );

  const handleFilter = () => {
    // const priority: Priority = state.contacts.map(
    //   (contact: { contactPriority: any }) => contact.contactPriority
    // );
    // //console.log(priority, 'priority');
    // const groundS: GroundStation = state.contacts.map(
    //   (contact: { contactGround: any }) => contact.contactGround
    // );
    // const cState: ContactState = state.contacts.map(
    //   (contact: { contactState: any }) => contact.contactState
    // );
    // if (priority) {
    //   filterContacts(priority);
    // }
    // if (groundS) {
    //   //@ts-expect-error
    //   filterContacts(groundS);
    // }
    // if (cState) {
    //   //@ts-expect-error
    //   filterContacts(cState);
    // }
    filterContacts(cState);
  };

  const handleClear = () => {
    resetSelectedContact();
  };

  //const checkboxes = document.querySelectorAll;

  return (
    <RuxContainer className='filter-contact'>
      <header slot='header'>
        <RuxIcon icon='arrow-back' size='1.5rem' onClick={handleClose} />
        Filter Contacts
        <RuxButton borderless secondary icon='refresh' onClick={handleClear}>
          Reset Filters
        </RuxButton>
      </header>

      <RuxCheckboxGroup label='Priority'>
        <RuxCheckbox
          label='# High 1 - 66'
          checked={state}
          onRuxinput={handleFilter}
        />
        <RuxCheckbox label='# Medium 67 - 133' onRuxinput={handleFilter} />
        <RuxCheckbox label='# Low 134 - 200' onRuxinput={handleFilter} />
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
