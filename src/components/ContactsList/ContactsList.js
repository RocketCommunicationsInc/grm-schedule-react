import { useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AstroReactTable } from 'common';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { columnDefs } from './ContactsListColumns';
import './ContactsList.scss';

const TwoDigitTime = ({ time }) => (
  <RuxDatetime
    date={new Date(time)}
    hour='2-digit'
    minute='2-digit'
    second='2-digit'
  />
);

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('contactResolutionStatus', {
    header: 'Priority',
    cell: (info) => info.getValue().toUpperCase(),
    size: 80,
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
    size: 68,
  }),
  columnHelper.accessor('contactName', {
    header: 'IRON',
    size: 68,
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
    size: 148,
  }),
  columnHelper.accessor('contactREV', {
    header: 'REV',
    size: 60,
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
    size: 424,
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue().toUpperCase(),
    size: 120,
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
    size: 60,
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    size: 112,
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactAOS', {
    header: 'AOS',
    size: 96,
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'LOS',
    size: 96,
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Stop Time',
    size: 112,
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];

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
