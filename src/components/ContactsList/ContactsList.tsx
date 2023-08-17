import { useMemo, useState } from 'react';
import {
  RowData,
  SortingFn,
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

  // const sortStatus: SortingFn<Contact> = (a: any, b: any, columnId: string, sortDirection: string) => {
  //   const statusOrder = [
  //     'off',
  //     'standby',
  //     'normal',
  //     'caution',
  //     'serious',
  //     'critical',
  //   ];
  //   const statusAsc = statusOrder.indexOf(a.contactStatus);
  //   const statusDesc = statusOrder.indexOf(b.contactStatus);
  //   //if (!asc) {
  //     return a.getValue(columnId).value < b.getValue(columnId).value
  //       ? statusAsc
  //       : statusDesc;
  //   //}
  // };

  const sortStatus: any = (
    rows: any,
    columnId: string,
    sortDirection: string
  ) => {
    console.log('hitting');
    const statusOrder = [
      'off',
      'standby',
      'normal',
      'caution',
      'serious',
      'critical',
    ];
    return rows.sort((a: any, b: any) => {
      const aVal = a.original[columnId];
      const bVal = b.original[columnId];
      const statusAsc = statusOrder.indexOf(aVal);
      const statusDesc = statusOrder.indexOf(bVal);
      if (sortDirection !== 'ASC') {
        console.log(statusAsc - statusDesc);
        return statusAsc - statusDesc;
      } else {
        return statusDesc - statusAsc;
      }
    });
  };

  const table = useReactTable({
    data: state.searchedContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiSort: true,
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      sortStatus: sortStatus,
    },
    // sortingFns: {
    //   sortStatus: (a: any, b: any, column: any): number =>
    //     a.getValue(column).value < b.getValue(column).value ? 1 : -1,
    // },
  });

  // useMemo(() => {
  //   if (columns[1].header === 'Status') {
  //     sortContacts(state.searchedContacts, sortDirection);
  //   }
  // }, [
  //   columns,
  //   sortDirection,
  //   state.searchedContacts,
  //   // table.initialState.sorting,
  // ]);

  // console.log(columns[1]);
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
