import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../common/Table/Table';
import { setHhMmSs } from './date';

export const searchContacts = (
  contactsArray: Contact[],
  searchValue: string,
  columnDefs: ColumnDef[]
) => {
  if (!searchValue) return contactsArray;
  const propertyArray = columnDefs.map((def) => def.property);
  const filteredForStateContacts = contactsArray.filter((contact) =>
    propertyArray.some((key) => {
      const contactVal = contact[key];
      if (
        key === 'beginTimestamp' ||
        key === 'endTimestamp' ||
        key === 'los' ||
        key === 'aos'
      ) {
        return setHhMmSs(contactVal as number | Date)
          .toString()
          .includes(searchValue);
      } else {
        return contactVal
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    })
  );
  return filteredForStateContacts || contactsArray;
};
