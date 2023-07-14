import { useState, useEffect, useCallback } from 'react';
import type { MouseEventHandler } from 'react';
import { RuxTable } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import './Table.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export type ColumnDef = {
  label: string;
  property: keyof Contact;
  valueFn?: Function;
};

type PropTypes = {
  columnDefs: ColumnDef[];
  filteredData: Contact[];
  onRowClick: MouseEventHandler<HTMLElement>;
};

const Table = ({ columnDefs, filteredData, onRowClick }: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortProp, setSortProp] = useState<keyof Contact>('id');
  const [sortedData, setSortedData] = useState<Contact[]>([]);

  const sortData = useCallback(
    (property: keyof Contact, sortDirection: 'ASC' | 'DESC') => {
      const sortedData = [...filteredData].sort((a: Contact, b: Contact) => {
        const firstContactValue = a[property];
        const secondContactValue = b[property];
        if (sortDirection !== 'ASC') {
          return String(firstContactValue).localeCompare(
            String(secondContactValue)
          );
        } else {
          return String(secondContactValue).localeCompare(
            String(firstContactValue)
          );
        }
      });
      setSortedData(sortedData);
    },
    [filteredData]
  );

  useEffect(() => {
    sortData(sortProp, sortDirection);
  }, [columnDefs, filteredData, sortData, sortDirection, sortProp]);

  return (
    <div className='table-wrapper'>
      <RuxTable>
        <TableHeader
          columnDefs={columnDefs}
          setSortProp={setSortProp}
          setSortDirection={setSortDirection}
          sortProp={sortProp}
          sortDirection={sortDirection}
        />
        <TableBody
          columnDefs={columnDefs}
          sortedData={sortedData}
          onRowClick={onRowClick}
        />
      </RuxTable>
    </div>
  );
};

export default Table;
