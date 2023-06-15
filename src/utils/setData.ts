import { groupByToMap, setGroup } from './grouping';

export const setData = (contacts: any[]) => {
  const ends = contacts.map((c) => c.contactEndTimestamp);
  const starts = contacts.map((c) => c.contactBeginTimestamp);

  return {
    contacts,
    regions: setGroup(
      groupByToMap(
        [...contacts],
        (e: { contactGround: Date | number }) => e.contactGround
      )
    ),
    start: new Date(Math.min(...starts)),
    end: new Date(Math.max(...ends)),
    filteredData: contacts,
    searchedContacts: contacts,
  };
};
