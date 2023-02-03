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
    minSize: 100,
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
    minSize: 80,
  }),
  columnHelper.accessor('contactName', {
    header: 'IRON',
    minSize: 80,
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
    minSize: 140,
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'REV',
    minSize: 100,
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
    flex: 4,
    minSize: 448,
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue().toUpperCase(),
    minSize: 120,
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
    minSize: 80,
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    minSize: 120,
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
    minSize: 120,
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
    minSize: 120,
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
    minSize: 120,
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

const setStyles = (column) => ({
  flex: column.columnDef.flex,
  maxWidth: column.columnDef.maxSize,
  minWidth: column.columnDef.minSize,
});

const ContactsList = ({ handleAction }) => {
  const columns = useMemo(() => columnDefs, []);
  const { setSelectedContact } = useAppActions();
  const { state } = useAppContext();
  const selectedId = state.selectedContact?.contactId;

  const { getRowModel, getFlatHeaders } = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSelect = (original) => {
    setSelectedContact(original);
    handleAction('details');
  };

  const headers = getFlatHeaders();
  const rows = getRowModel().rows;

  return (
    <div className='Contacts-list'>
      <div className='Astro-list'>
        <header className='Astro-list__header'>
          {headers.map(({ id, column, getContext, isPlaceholder }) => (
            <div className='Astro-list__header-col' style={setStyles(column)}>
              <div
                key={id}
                onClick={column.getToggleSortingHandler()}
                className={classNames('Contacts-list__heading', {
                  'Contacts-list__sorted': column.getIsSorted(),
                })}
              >
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
            </div>
          ))}
        </header>

        <ul>
          {rows.map(({ id, getVisibleCells, original }) => (
            <li
              key={id}
              onClick={() => handleSelect(original)}
              className={classNames('Astro-list__item', {
                'Astro-list__item-selected': original.contactId === selectedId,
              })}
            >
              {getVisibleCells().map(({ id, column, getContext }) => (
                <div
                  key={id}
                  className='Astro-list__item-col'
                  style={setStyles(column)}
                >
                  {flexRender(column.columnDef.cell, getContext())}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactsList;
