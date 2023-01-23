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

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('contactResolutionStatus', {
    header: 'Priority',
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
  }),
  columnHelper.accessor('contactName', {
    header: 'IRON',
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'REV',
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    cell: (info) => (
      <RuxDatetime
        date={new Date(info.getValue())}
        hour='2-digit'
        minute='2-digit'
        second='2-digit'
      />
    ),
  }),
  columnHelper.accessor('contactAOS', {
    header: 'AOS',
    cell: (info) => (
      <RuxDatetime
        date={new Date(info.getValue())}
        hour='2-digit'
        minute='2-digit'
        second='2-digit'
      />
    ),
  }),
  columnHelper.accessor('contactLOS', {
    header: 'LOS',
    cell: (info) => (
      <RuxDatetime
        date={new Date(info.getValue())}
        hour='2-digit'
        minute='2-digit'
        second='2-digit'
      />
    ),
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Stop Time',
    cell: (info) => (
      <RuxDatetime
        date={new Date(info.getValue())}
        hour='2-digit'
        minute='2-digit'
        second='2-digit'
      />
    ),
  }),
];

const setColWidth = (index) => {
  if (index === 0 || index === 1 || index === 2 || index === 4) return 80;
  if (index === 3) return 140;
  if (index === 5) return 448;
  if (index === 6) return 110;
  if (index === 7) return 70;
  if (index === 8 || index === 9 || index === 10 || index === 11) return 124;
  throw new Error('Unhandled col width: ' + index);
};

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
              {headers.map(({ id, column, getContext, isPlaceholder }, i) => (
                <th
                  className={column.getIsSorted() ? 'sorted' : undefined}
                  width={setColWidth(i)}
                  key={id}
                  onClick={column.getToggleSortingHandler()}
                >
                  <div className='Contacts-list__th-inner'>
                    <div>
                      {isPlaceholder
                        ? null
                        : flexRender(column.columnDef.header, getContext())}
                    </div>
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
              {getVisibleCells().map(({ id, column, getContext }, i) => (
                <td width={setColWidth(i)} key={id}>
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
