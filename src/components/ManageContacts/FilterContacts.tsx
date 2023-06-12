import { SetStateAction, useState } from 'react';
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
import { Contact, ContactState, GroundStation, Priority } from 'Types';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
  //priority: Priority;
};

const ManageContact = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact, filterContacts } = useAppActions();
  const { state } = useAppContext();
  const checkbox = document.querySelector('rux-checkbox');
  const [checked, setChecked] = useState(false);

  console.log(state);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  //console.log(state);
  const priority: Priority = state.contacts.map((contact: any) => contact);

  // const cState: ContactState = state.contacts.map(
  //   (contact: { contactState: any }) => contact.contactState
  // );

  const ruxCheckboxGroup = document.querySelector('rux-checkbox-group');
  //console.log(ruxCheckboxGroup);

  const handleFilter = () => {
    //     const priorityFilter = priority
    // ? state.contacts.filter(
    //   (contact: Contact) => contact.contactPriority === priority
    //   )
    //   : state.contact;
    //   console.log(priorityFilter, "priority")
    //   const groundFilter = groundStation
    //   ? state.contacts.filter(
    //     (contact: Contact) => contact.contactGround === groundStation
    //     )
    //     : state.contact;
    //     const stateFilter = contactState
    //     ? state.contacts.filter(
    //       (contact: Contact) => contact.contactState === contactState
    //       )
    //       : state.contact;
    // const priority: Priority = state.contacts.map(
    //   (contact: { contactPriority: any }) => contact.contactPriority === 'Low'
    // );
    // console.log(priority, 'priority');
    // const groundS: GroundStation = state.contacts.map(
    //   (contact: { contactGround: any }) => contact.contactGround
    // );
    // const cState: ContactState = state.contacts.map(
    //   (contact: { contactState: any }) => contact.contactState
    // );
    // if (ruxCheckboxGroup?.label === 'Priority') {
    //   filterContacts(priority);
    // }
    // if (groundS) {
    //   filterContacts(groundS);
    // }
    // if (cState) {
    //   filterContacts(cState);
    // }
    filterContacts();
  };

  const handleClear = (e: any) => {
    console.log(checkbox);
    if (checkbox?.checked) {
      checkbox.checked = false;
    }
  };

  //make a copy filter from there. Import 'setData' and format data.
  return (
    <RuxContainer className='filter-contact'>
      <header slot='header'>
        <RuxIcon icon='arrow-back' size='1.5rem' onClick={handleClose} />
        Filter Contacts
        <RuxButton
          borderless
          secondary
          icon='refresh'
          onClick={(e) => handleClear(e)}
        >
          Reset Filters
        </RuxButton>
      </header>

      <RuxCheckboxGroup label='Priority'>
        <RuxCheckbox label='# High 1 - 66' onRuxinput={handleFilter} />
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

// const priorityFilter = priority
// ? state.contacts.filter(
//   (contact: Contact) => contact.contactPriority === priority
//   )
//   : state.contact;
//   console.log(priorityFilter, "priority")
//   const groundFilter = groundStation
//   ? state.contacts.filter(
//     (contact: Contact) => contact.contactGround === groundStation
//     )
//     : state.contact;

//     const stateFilter = contactState
//     ? state.contacts.filter(
//       (contact: Contact) => contact.contactState === contactState
//       )
//       : state.contact;

// const filterData = () => {
//   if (priority) {
//     state.contact.filter(
//       (contact: Contact) => contact.contactPriority === priority
//     );
//   } else if (groundStation) {
//     state.contact.filter(
//       (contact: Contact) => contact.contactGround === groundStation
//     );
//   } else if (contactState) {
//     state.contact.filter(
//       (contact: Contact) => contact.contactState === contactState
//     );
//   } else return state.contact;
// };

//     const filteredData = () => {
//       if(priorityFilter) {
// setData(priorityFilter)
//       } if(groundFilter) {
//         setData(groundFilter)
//       } if  (stateFilter) {
//         setData(stateFilter)
//       }
//     }
//     console.log(priorityFilter, "priFilt")
