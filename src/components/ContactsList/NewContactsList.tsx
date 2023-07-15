import { useMemo, useCallback } from 'react';
import { RuxContainer, RuxNotification, RuxButton } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../../common/Table/Table';
import Table from '../../common/Table/Table';
import { determineTimeString, setHhMmSs } from '../../utils/date';
import { searchContacts } from '../../utils/searchContacts';

export function capitalize(str: string) {
  if (!str) return;
  let arr = str.split('-');
  let capitalized = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return capitalized.join(' ');
}

type PropTypes = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleAction: (e: any) => void;
};

const columnDefs: ColumnDef[] = [
  { label: 'Priority', property: 'priority' },
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  { label: 'REV', property: 'rev' },
  { label: 'Equipment', property: 'equipment' },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
  },
  { label: 'AOS', property: 'aos', valueFn: determineTimeString },
  { label: 'LOS', property: 'los', valueFn: determineTimeString },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
  },
];

const ContactsTable = ({
  searchValue = '',
  setSearchValue,
  handleAction,
}: PropTypes) => {
  const { dataArray: contacts } = useTTCGRMContacts();

  const handleRowClick = (row: any) => {
    handleAction('details');
  };

  const handleClearFilter = () => {
    setSearchValue('');
  };

  const filteredContacts = useMemo(() => {
    return searchContacts(contacts, searchValue, columnDefs);
  }, [contacts, searchValue]);

  return (
    <RuxContainer>
      <RuxNotification open={searchValue !== ''} small hide-close>
        One or more filters selected.
        <RuxButton
          onClick={handleClearFilter}
          secondary
          borderless
          size='small'
        >
          Clear filters
        </RuxButton>
        to display all alerts.
      </RuxNotification>
      <Table
        columnDefs={columnDefs}
        filteredData={filteredContacts}
        onRowClick={handleRowClick}
      />
    </RuxContainer>
  );
};

export default ContactsTable;
