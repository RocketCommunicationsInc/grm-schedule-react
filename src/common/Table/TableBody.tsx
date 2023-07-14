import { RuxTableBody } from '@astrouxds/react';
import TableBodyRow from './TableBodyRow';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';
import type { MouseEventHandler } from 'react';

type PropTypes = {
  columnDefs: ColumnDef[];
  sortedData: Contact[];
  onRowClick: MouseEventHandler<HTMLElement>;
};

const TableBody = ({ columnDefs, sortedData, onRowClick }: PropTypes) => {
  return (
    <RuxTableBody>
      {sortedData.map((data) => {
        return (
          <TableBodyRow
            key={data.id}
            columnDefs={columnDefs}
            rowData={data}
            onRowClick={onRowClick}
          />
        );
      })}
    </RuxTableBody>
  );
};

export default TableBody;
