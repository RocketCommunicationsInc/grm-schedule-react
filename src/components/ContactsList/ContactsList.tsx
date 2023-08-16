import { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AstroReactTable } from 'common/AstroReactTable/AstroReactTable';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { columnDefs } from './ContactsListColumns';
import { AstroReactTableHeader } from 'common/AstroReactTable/AstroReactTableHeader';
import { Contact } from 'Types';
import './ContactsList.css';

type PropTypes = {
  handleAction: (e: any) => void;
};
type SortDirection = 'ASC' | 'DESC';

const ContactsList = ({ handleAction }: PropTypes) => {
  const columns = useMemo(() => columnDefs, []);
  const { setSelectedContact } = useAppActions();
  const { state } = useAppContext();

  const selectedId = state.selectedContact?.contactId;
  const handleSelected = (row: { contactId: any }) =>
    row.contactId === selectedId;

  const handleRowClick = (row: any) => {
    setSelectedContact(row);
    handleAction('details');
  };

  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  const sortContacts = (
    contactsArr: Contact[],
    sortDirection: SortDirection
  ) => {
    const newSortedContacts = [...contactsArr].sort((a, b) => {
      const statusOrder = [
        'off',
        'standby',
        'normal',
        'caution',
        'serious',
        'critical',
      ];
      const statusAsc = statusOrder.indexOf(a.contactStatus);
      const statusDesc = statusOrder.indexOf(b.contactStatus);
      if (sortDirection !== 'ASC') {
        return statusAsc - statusDesc;
      } else {
        return statusDesc - statusAsc;
      }
    });

    return newSortedContacts;
  };

  const table = useReactTable({
    data: state.searchedContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      sortStatus: sortContacts,
    },
  });

  useEffect(() => {
    if (columns[1].header === 'Status') {
      sortContacts(state.searchedContacts, sortDirection);
    }
  }, [
    columns,
    sortDirection,
    state.searchedContacts,
    // table.initialState.sorting,
  ]);

  console.log(columns[1]);
  return (
    <div className='table-wrapper'>
      <AstroReactTableHeader isSortable table={table} />
      <div className='Contacts-list'>
        <AstroReactTable
          table={table}
          onRowClick={handleRowClick}
          setIsSelected={handleSelected}
        />
      </div>
    </div>
  );
};

export default ContactsList;
