import classNames from 'classnames';
import { RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import './AstroTable.scss';

export const AstroTable = ({ table, onRowClick, setIsSelected }) => (
  <div className='Astro-table'>
    <header className='Astro-table__header'>
      {table.getFlatHeaders().map(({ id, column, getContext }) => (
        <div
          key={id}
          className={classNames('Astro-table__col', {
            'Astro-table__sorted': column.getIsSorted(),
          })}
          style={column.columnDef.style}
          onClick={column.getToggleSortingHandler()}
        >
          {flexRender(column.columnDef.header, getContext())}

          {{
            asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
            desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
          }[column.getIsSorted()] ?? null}
        </div>
      ))}
    </header>

    <div className='Astro-table__body'>
      {table.getRowModel().rows.map(({ id, getVisibleCells, original }) => (
        <div
          key={id}
          onClick={() => onRowClick && onRowClick(original)}
          className={classNames('Astro-table__row', {
            'Astro-table__selected': setIsSelected && setIsSelected(original),
            'Astro-table__selectable': !!onRowClick,
          })}
        >
          {getVisibleCells().map(({ id, column, getContext }) => (
            <div
              key={id}
              className='Astro-table__cell'
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
