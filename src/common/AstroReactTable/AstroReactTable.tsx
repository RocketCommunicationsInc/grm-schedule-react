import { RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import './AstroReactTable.css';

type PropTypes = {
  table: any;
  isSortable: boolean;
  onRowClick: (original: any) => void;
  setIsSelected: (original: any) => void;
};

export const AstroReactTable = ({
  table,
  isSortable = false,
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
      <header className='Astro-react-table__header'>
        {table.getFlatHeaders().map(({ id, column, getContext }: any) => (
          <div
            key={id}
            className={
              isSortable && !!column.getIsSorted()
                ? 'Astro-react-table__col Astro-react-table__sorted'
                : 'Astro-react-table__col' || isSortable
                ? 'Astro-react-table__col Astro-react-table__sortable'
                : 'Astro-react-table__col'
            }
            style={column.columnDef.style}
            onClick={isSortable ? column.getToggleSortingHandler() : undefined}
          >
            {flexRender(column.columnDef.header, getContext())}

            {isSortable &&
              //@ts-expect-error need to rip out classNames
              {
                asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
              }[column.getIsSorted()]}
          </div>
        ))}
      </header>

      <div className='Astro-react-table__body'>
        {table
          .getRowModel()
          .rows.map(({ id, getVisibleCells, original }: any) => (
            <div
              key={id}
              onClick={() => handleRowClick(original)}
              className={
                handleIsSelected(original)
                  ? 'Astro-react-table__row Astro-react-table__selected'
                  : 'Astro-react-table__row' || !!onRowClick
                  ? 'Astro-react-table__row Astro-react-table__selectable'
                  : 'Astro-react-table__row'
              }
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
