import { useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AstroTable } from 'common';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { columnDefs } from './ContactsListColumns';
import './ContactsList.scss';

const ContactsList = ({ handleAction }) => {
  const columns = useMemo(() => columnDefs, []);
  const { setSelectedContact } = useAppActions();
  const { state } = useAppContext();
  const selectedId = state.selectedContact?.contactId;
  const handleSelected = (row) => row.contactId === selectedId;

  const handleRowClick = (row) => {
    setSelectedContact(row);
    handleAction('details');
  };

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='Contacts-list'>
      <AstroTable
        table={table}
        onRowClick={handleRowClick}
        setIsSelected={handleSelected}
      />
    </div>
  );
};

export default ContactsList;
