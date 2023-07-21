import type { MouseEventHandler } from 'react';
import { RuxTableRow, RuxTableCell, RuxStatus } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  rowData: Contact;
  onRowClick: MouseEventHandler<HTMLElement>;
};

const ContactsTable = ({ columnDefs, rowData, onRowClick }: PropTypes) => {
  return (
    <RuxTableRow
      key={rowData.id}
      data-rowDataId={rowData.id}
      onClick={onRowClick}
    >
      {columnDefs.map((colDef, index) => {
        const property = colDef.property;
        const cellValue = colDef.valueFn
          ? colDef.valueFn(rowData[property])
          : rowData[property];
        return (
          <RuxTableCell key={colDef.label}>
            {property === 'status' ? (
              <RuxStatus status={cellValue}></RuxStatus>
            ) : (
              cellValue
            )}
          </RuxTableCell>
        );
      })}
    </RuxTableRow>
  );
};

export default ContactsTable;
