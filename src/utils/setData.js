import { groupByToMap, setGroup } from './grouping';

export const setData = (contacts) => {
  const ends = contacts.map((c) => c.contactEndTimestamp);
  const starts = contacts.map((c) => c.contactBeginTimestamp);

  return {
    contacts,
    regions: setGroup(groupByToMap([...contacts], (e) => e.contactGround)),
    start: new Date(Math.min(...starts) * 1000),
    end: new Date(Math.max(...ends) * 1000),
  };
};
