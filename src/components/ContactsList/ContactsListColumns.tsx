// @ts-nocheck
import { RuxDatetime, RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';

type PropTypes = {
  time: Date;
};

const TwoDigitTime = ({ time }: PropTypes) => (
  <RuxDatetime
    date={new Date(time)}
    hour='2-digit'
    minute='2-digit'
    second='2-digit'
  />
);

const sortStatus = (
  a: number,
  b: number,
  columnId: string,
  sortDirection: string
) => {
  const statusOrder = [
    'off',
    'standby',
    'normal',
    'caution',
    'serious',
    'critical',
  ];
  const aVal = a.original[columnId];
  const bVal = b.original[columnId];
  const statusAsc = statusOrder.indexOf(aVal);
  const statusDesc = statusOrder.indexOf(bVal);
  if (sortDirection !== 'ASC') {
    return statusAsc - statusDesc;
  } else {
    return statusDesc - statusAsc;
  }
};

const columnHelper = createColumnHelper<any>();

export const columnDefs = [
  columnHelper.accessor('contactPriority', {
    header: 'Priority',
    cell: (info) => info.getValue(),
    style: { minWidth: 55, maxWidth: 50 },
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
    style: { minWidth: 65, justifyContent: 'center' },
    sortingFn: sortStatus,
  }),
  columnHelper.accessor('contactName', {
    header: 'IRON',
    style: { minWidth: 68 },
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
    style: { minWidth: 148 },
  }),
  columnHelper.accessor('contactREV', {
    header: 'REV',
    style: { minWidth: 60 },
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
    style: { minWidth: 424, flex: 4 },
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue(),
    style: { minWidth: 120 },
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
    style: { minWidth: 60 },
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    style: { minWidth: 112 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactAOS', {
    header: 'AOS',
    style: { minWidth: 96 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'LOS',
    style: { minWidth: 96 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Stop Time',
    style: { minWidth: 112 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];
