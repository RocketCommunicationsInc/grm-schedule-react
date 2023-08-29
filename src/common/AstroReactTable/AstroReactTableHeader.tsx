import { RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import './AstroReactTable.css';

type PropTypes = {
  table: any;
  isSortable: boolean;
};

export const AstroReactTableHeader = ({
  table,
  isSortable = false,
}: PropTypes) => {
  return (
    <header className='Astro-react-table__header'>
      {table.getFlatHeaders().map(({ id, column, getContext }: any) => {
        return (
          <div
            key={id}
            className={`Astro-react-table__col ${
              isSortable && !!column.getIsSorted()
                ? 'Astro-react-table__sorted'
                : isSortable
                ? 'Astro-react-table__sortable'
                : ''
            }`}
            style={column.columnDef.style}
          >
            <span
              onClick={
                isSortable ? column.getToggleSortingHandler() : undefined
              }
            >
              <span>{flexRender(column.columnDef.header, getContext())}</span>
              <div className='sort-icon'>
                {isSortable && (
                  <RuxIcon
                    icon={
                      //@ts-expect-error with types
                      {
                        asc: 'arrow-drop-up',
                        desc: 'arrow-drop-down',
                      }[column.getIsSorted()] || 'arrow-drop-down'
                    }
                    size='small'
                  />
                )}
              </div>
            </span>
          </div>
        );
      })}
    </header>
  );
};
