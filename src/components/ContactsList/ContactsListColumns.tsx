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

const columnHelper = createColumnHelper<any>();

export const columnDefs = [
  columnHelper.accessor('contactPriority', {
    header: 'Priority',
    cell: (info) => info.getValue(),
    style: { minWidth: 50, maxWidth: 50 },
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
    style: { minWidth: 60, justifyContent: 'center' },
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
