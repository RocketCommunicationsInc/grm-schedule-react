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
import { Status } from 'Types';
import { capitalize } from 'utils/labels';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
};

const FilterContacts = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact, searchAndFilterContacts } = useAppActions();
  const [multipleFilters, setMultipleFilters] = useState([]) as any;

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

  const handleFilter = (e: any) => {
    searchAndFilterContacts(e.target.value);
  };

  const checkboxes = document.getElementsByClassName(
    'filter-checkboxes'
  ) as any;

  const handleCheckboxFilter = (e: any) => {
    const allCheckedValues = [];
    const { value } = e.target;
    setMultipleFilters((prevFilters: string[]) => {
      for (let i = 0; i < checkboxes.length; i++) {
        const checked = checkboxes[i].checked;
        if (checked) {
          return [...prevFilters, value];
        }
        // else {
        //   prevFilters.filter((filter: any) => filter !== value);
        // }
      }
    });
  };

  const handleReset = () => {
    searchAndFilterContacts('');
    const priorityCb = priorityCB.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    const groundCb = groundCB.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    const stateCb = stateCB.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    const statusCb = statusCB.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    setPriorityCB(priorityCb);
    setGroundCB(groundCb);
    setStateCB(stateCb);
    setStausCB(statusCb);
  };

  const handleCheckboxes = (id: number) => {
    const priorityCb = priorityCB.map((checkbox: any) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    const statusCb = statusCB.map((checkbox: any) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    const stateCb = stateCB.map((checkbox: any) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    const groundCb = groundCB.map((checkbox: any) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    setPriorityCB(priorityCb);
    setGroundCB(groundCb);
    setStateCB(stateCb);
    setStausCB(statusCb);
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
            onRuxinput={handleCheckboxFilter}
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
            onRuxinput={handleFilter}
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
        onRuxinput={handleFilter}
      />

      <RuxCheckboxGroup label='Ground Station'>
        {groundCB.map(({ id, checked, value, label }) => (
          <RuxCheckbox
            value={value}
            onRuxinput={handleFilter}
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
            onRuxinput={handleFilter}
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
        onRuxinput={handleFilter}
      />
    </RuxContainer>
  );
};

export default FilterContacts;
