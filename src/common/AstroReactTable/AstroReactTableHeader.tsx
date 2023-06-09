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
      {table.getFlatHeaders().map(({ id, column, getContext }: any) => (
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
          onClick={isSortable ? column.getToggleSortingHandler() : undefined}
        >
          {flexRender(column.columnDef.header, getContext())}

          {isSortable &&
            //@ts-expect-error with types
            {
              asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
              desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
            }[column.getIsSorted()]}
        </div>
      ))}
    </header>
  );
};
