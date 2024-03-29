import { useMemo } from 'react';
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
import './ContactsList.css';

type PropTypes = {
  handleAction: (e: any) => void;
};

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

  const table = useReactTable({
    data: state.searchedContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

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
