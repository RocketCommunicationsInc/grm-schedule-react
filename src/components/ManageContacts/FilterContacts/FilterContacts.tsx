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
import { useAppActions } from 'hooks/useAppActions';
import './FilterContacts.css';
import { Ground, Priortiy, State, Status } from 'Types';
import { capitalize } from 'utils/labels';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
};

const FilterContacts = ({ handleAction }: PropTypes) => {
  const {
    resetSelectedContact,
    filterContacts,
    filterIronAndEqupimentContacts,
  } = useAppActions();

  const [priorityCB, setPriorityCB] = useState([
    { id: 1, checked: false, value: 'high', label: '# High 1 - 66' },
    { id: 2, checked: false, value: 'medium', label: '# Medium 67 - 133' },
    { id: 3, checked: false, value: 'low', label: '# Low 134 - 200' },
  ]);
  const [statusCB, setStausCB] = useState([
    {
      id: 4,
      checked: false,
      value: 'critical',
      label: 'critical',
      status: 'critical',
    },
    {
      id: 5,
      checked: false,
      value: 'serious',
      label: 'serious',
      status: 'serious',
    },
    {
      id: 6,
      checked: false,
      value: 'caution',
      label: 'caution',
      status: 'caution',
    },
    {
      id: 7,
      checked: false,
      value: 'normal',
      label: 'normal',
      status: 'normal',
    },
  ]);
  const [groundCB, setGroundCB] = useState([
    { id: 8, checked: false, value: 'cts', label: 'CTS' },
    { id: 9, checked: false, value: 'hts', label: 'HTS' },
    { id: 10, checked: false, value: 'dgs', label: 'DGS' },
    { id: 11, checked: false, value: 'tcs', label: 'TCS' },
  ]);
  const [stateCB, setStateCB] = useState([
    { id: 13, checked: false, value: 'upcoming', label: 'Upcoming' },
    { id: 14, checked: false, value: 'executing', label: 'Executing' },
    { id: 15, checked: false, value: 'complete', label: 'Complete' },
    { id: 16, checked: false, value: 'failed', label: 'Failed' },
  ]);

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  const handleCheckboxFilter = () => {
    const checkedPriorityCB = priorityCB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value as Priortiy);

    const checkedStatusCB = statusCB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value as Status);

    const checkedGroundCB = groundCB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value as Ground);

    const checkedStateCB = stateCB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value as State);
    console.log(checkedGroundCB, 'ground');
    console.log(checkedPriorityCB, 'priority');
    console.log(checkedStateCB, 'state');
    console.log(checkedStatusCB, 'status');

    filterContacts(
      checkedStatusCB.length > 0 ? checkedStatusCB[0] : '',
      checkedPriorityCB.length > 0 ? checkedPriorityCB[0] : '',
      checkedGroundCB.length > 0 ? checkedGroundCB[0] : '',
      checkedStateCB.length > 0 ? checkedStateCB[0] : ''
    );
  };

  const handleReset = () => {
    filterContacts('', '', '', '');
    setPriorityCB(
      priorityCB.map((checkbox) => ({ ...checkbox, checked: false }))
    );
    setGroundCB(groundCB.map((checkbox) => ({ ...checkbox, checked: false })));
    setStateCB(stateCB.map((checkbox) => ({ ...checkbox, checked: false })));
    setStausCB(statusCB.map((checkbox) => ({ ...checkbox, checked: false })));
  };

  const handleCheckboxes = (id: number) => {
    setPriorityCB((prevValue) =>
      prevValue.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
    setGroundCB((prevValue) =>
      prevValue.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
    setStateCB((prevValue) =>
      prevValue.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
    setStausCB((prevValue) =>
      prevValue.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
    handleCheckboxFilter();
  };

  return (
    <RuxContainer className='filter-contact'>
      <header slot='header'>
        <RuxIcon icon='arrow-back' size='1.5rem' onClick={handleClose} />
        Filter Contacts
        <RuxButton onClick={handleReset} borderless secondary icon='refresh'>
          Reset Filters
        </RuxButton>
      </header>

      <RuxCheckboxGroup label='Priority'>
        {priorityCB.map(({ id, checked, value, label }) => (
          <RuxCheckbox
            value={value}
            // onRuxinput={handleCheckboxFilter}
            label={label}
            checked={checked}
            onRuxchange={() => handleCheckboxes(id)}
            key={id}
            className='filter-checkboxes'
          />
        ))}
      </RuxCheckboxGroup>

      <RuxCheckboxGroup label='Status'>
        {statusCB.map(({ id, checked, value, label, status }) => (
          <RuxCheckbox
            value={value}
            // onRuxinput={handleCheckboxFilter}
            label={label}
            checked={checked}
            onRuxchange={() => handleCheckboxes(id)}
            key={id}
          >
            <RuxStatus status={status as Status} />
            {capitalize(status)}
          </RuxCheckbox>
        ))}
      </RuxCheckboxGroup>

      <RuxInput
        type='search'
        label='IRON'
        placeholder='All IRONs'
        size='small'
        onRuxinput={(e: any) =>
          filterIronAndEqupimentContacts(e.target.value, 'iron')
        }
      />

      <RuxCheckboxGroup label='Ground Station'>
        {groundCB.map(({ id, checked, value, label }) => (
          <RuxCheckbox
            value={value}
            onRuxinput={handleCheckboxFilter}
            label={label}
            checked={checked}
            onRuxchange={() => handleCheckboxes(id)}
            key={id}
          />
        ))}
      </RuxCheckboxGroup>

      <RuxCheckboxGroup label='State'>
        {stateCB.map(({ id, checked, value, label }) => (
          <RuxCheckbox
            value={value}
            onRuxinput={handleCheckboxFilter}
            label={label}
            checked={checked}
            onRuxchange={() => handleCheckboxes(id)}
            key={id}
          />
        ))}
      </RuxCheckboxGroup>

      <RuxInput
        type='search'
        label='Equipment String'
        placeholder='All Equipment'
        size='small'
        onRuxinput={(e: any) =>
          filterIronAndEqupimentContacts(e.target.value, 'equipment')
        }
      />
    </RuxContainer>
  );
};

export default FilterContacts;
