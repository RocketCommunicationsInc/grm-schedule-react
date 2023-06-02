import { Contact } from 'Types';

const setLabelsCount = ({ type, contacts }: any) => {
  switch (type) {
    case 'contacts': {
      return contacts.length;
    }
    case 'upcoming': {
      const upcoming = contacts.filter((c: { contactState: string }) => {
        return c.contactState === 'scheduled';
      });
      return upcoming.length || 0;
    }
    case 'executing': {
      const excuting = contacts.filter((c: { contactState: string }) => {
        return c.contactState === 'executing';
      });
      return excuting.length || 0;
    }
    case 'complete': {
      const complete = contacts.filter((c: { contactState: string }) => {
        return c.contactState === 'complete';
      });
      return complete.length;
    }
    case 'failed': {
      const failed = contacts.filter((c: { contactState: string }) => {
        return c.contactState === 'failed';
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
