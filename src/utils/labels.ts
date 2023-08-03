import { Contact } from '@astrouxds/mock-data';

const setLabelsCount = ({ type, contacts }: any) => {
  switch (type) {
    case 'contacts': {
      return contacts.length;
    }
    case 'upcoming': {
      const upcoming = contacts.filter((c: { state: string }) => {
        return c.state === 'upcoming';
      });
      return upcoming.length || 0;
    }
    case 'executing': {
      const excuting = contacts.filter((c: { state: string }) => {
        return c.state === 'executing';
      });
      return excuting.length || 0;
    }
    case 'complete': {
      const complete = contacts.filter((c: { state: string }) => {
        return c.state === 'complete';
      });
      return complete.length;
    }
    case 'failed': {
      const failed = contacts.filter((c: { state: string }) => {
        return c.state === 'failed';
      });
      return failed.length || 0;
    }
    default:
      throw new Error(`Missed label type: ${type}`);
  }
};

export const setLabels = (contacts: Contact) => [
  {
    count: setLabelsCount({ type: 'contacts', contacts }),
    label: 'Contacts',
  },
  {
    count: setLabelsCount({ type: 'upcoming', contacts }),
    label: 'Upcoming',
  },
  {
    count: setLabelsCount({ type: 'executing', contacts }),
    label: 'Executing',
  },
  {
    count: setLabelsCount({ type: 'complete', contacts }),
    label: 'Complete',
  },
  {
    count: setLabelsCount({ type: 'failed', contacts }),
    label: 'Failed',
  },
];

export function capitalize(str: string) {
  if (!str) return;
  let arr = str.split('-');
  let capitalized = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return capitalized.join(' ');
}
