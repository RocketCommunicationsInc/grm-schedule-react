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
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='Contacts-list'>
      <AstroReactTable
        table={table}
        isSortable
        onRowClick={handleRowClick}
        setIsSelected={handleSelected}
      />
    </div>
  );
};

export default ContactsList;
