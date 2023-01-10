import { createColumnHelper, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import './ContactsList.scss';

const columnHelper = createColumnHelper();

const columnDefs = [columnHelper.accessor('_id', {})];

const ContactsList = () => {
  const columns = useMemo(() => columnDefs, []);

  useReactTable({
    columns,
  });

  return (
    <div>
      <div>List</div>
    </div>
  );
};

export default ContactsList;
