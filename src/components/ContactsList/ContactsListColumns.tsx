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
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => info.getValue(),
    style: { minWidth: 50, maxWidth: 50 },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
    style: { minWidth: 60, justifyContent: 'center' },
  }),
  columnHelper.accessor('name', {
    header: 'IRON',
    style: { minWidth: 68 },
  }),
  columnHelper.accessor('ground', {
    header: 'Ground Station',
    style: { minWidth: 148 },
  }),
  columnHelper.accessor('rev', {
    header: 'REV',
    style: { minWidth: 60 },
  }),
  columnHelper.accessor('equipment', {
    header: 'Equipment String',
    style: { minWidth: 424, flex: 4 },
  }),
  columnHelper.accessor('state', {
    header: 'State',
    cell: (info) => info.getValue(),
    style: { minWidth: 120 },
  }),
  columnHelper.accessor('dayOfYear', {
    header: 'DOY',
    style: { minWidth: 60 },
  }),
  columnHelper.accessor('beginTimestamp', {
    header: 'Start Time',
    style: { minWidth: 112 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('aos', {
    header: 'AOS',
    style: { minWidth: 96 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('los', {
    header: 'LOS',
    style: { minWidth: 96 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('endTimestamp', {
    header: 'Stop Time',
    style: { minWidth: 112 },
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];
