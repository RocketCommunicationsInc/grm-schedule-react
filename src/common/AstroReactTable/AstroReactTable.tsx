import { RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import './AstroReactTable.css';

type PropTypes = {
  table: any;
  onRowClick: (original: any) => void;
  setIsSelected: (original: any) => void;
};

export const AstroReactTable = ({
  table,
  onRowClick,
  setIsSelected,
}: PropTypes) => {
  const handleRowClick = (original: any) => {
    if (!onRowClick) return;
    onRowClick(original);
  };

  const handleIsSelected = (original: any) => {
    if (setIsSelected) return setIsSelected(original);
    return false;
  };

  return (
    <div className='Astro-react-table'>
      <div className='Astro-react-table__body'>
        {table
          .getRowModel()
          .rows.map(({ id, getVisibleCells, original }: any) => (
            <div
              key={id}
              onClick={() => handleRowClick(original)}
              className={`Astro-react-table__row ${
                handleIsSelected(original)
                  ? 'Astro-react-table__selected'
                  : !!onRowClick
                  ? 'Astro-react-table__selectable'
                  : ''
              }`}
            >
              {getVisibleCells().map(({ id, column, getContext }: any) => (
                <div
                  key={id}
                  className='Astro-react-table__cell'
                  style={column.columnDef.style}
                >
                  {flexRender(column.columnDef.cell, getContext())}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
