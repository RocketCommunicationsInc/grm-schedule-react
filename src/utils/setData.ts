import { groupByToMap, setGroup } from './grouping';

export const setData = (contacts: any[]) => {
  const ends = contacts.map((c) => c.endTimestamp);
  const starts = contacts.map((c) => c.beginTimestamp);

  return {
    contacts,
    regions: setGroup(
      groupByToMap([...contacts], (e: { ground: Date | number }) => e.ground)
    ),
    start: new Date(Math.min(...starts)),
    end: new Date(Math.max(...ends)),
    filteredData: contacts,
    searchedContacts: contacts,
    searchedRegionContacts: setGroup(
      groupByToMap([...contacts], (e: { ground: Date | number }) => e.ground)
    ),
  };
};
