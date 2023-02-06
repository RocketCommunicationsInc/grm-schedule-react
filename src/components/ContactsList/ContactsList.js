import { useMemo } from 'react';
import classNames from 'classnames';
import { RuxDatetime, RuxIcon, RuxStatus } from '@astrouxds/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
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

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSelect = (original) => {
    setSelectedContact(original);
    handleAction('details');
  };

  return (
    <div className='Contacts-list'>
      <table>
        <thead>
          {getHeaderGroups().map(({ headers, id }) => (
            <tr key={id}>
              <th />
              {headers.map(({ id, column, getContext, isPlaceholder }) => (
                <th
                  className={column.getIsSorted() ? 'sorted' : undefined}
                  width={column.columnDef.size}
                  key={id}
                  onClick={column.getToggleSortingHandler()}
                >
                  <div className='Contacts-list__th-inner'>
                    {isPlaceholder
                      ? null
                      : flexRender(column.columnDef.header, getContext())}

                    {{
                      asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                      desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
                    }[column.getIsSorted()] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {getRowModel().rows.map(({ id, getVisibleCells, original }) => (
            <tr
              key={id}
              onClick={() => handleSelect(original)}
              className={classNames('Contacts-list__contact-row', {
                selected: original.contactId === selectedId,
              })}
            >
              <td />
              {getVisibleCells().map(({ id, column, getContext }) => (
                <td width={column.columnDef.size} key={id}>
                  {flexRender(column.columnDef.cell, getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
