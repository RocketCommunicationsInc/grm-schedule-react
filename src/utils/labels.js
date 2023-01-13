const setLabelsCount = ({ type, contacts }) => {
  switch (type) {
    case 'contacts': {
      return contacts.length;
    }
    case 'upcoming': {
      const upcoming = contacts.filter((c) => {
        return c.contactResolution === 'scheduled';
      });
      return upcoming.length || 0;
    }
    case 'executing': {
      const excuting = contacts.filter((c) => {
        return c.contactState === 'executing';
      });
      return excuting.length || 0;
    }
    case 'complete': {
      const complete = contacts.filter((c) => {
        return c.contactResolution === 'complete';
      });
      return complete.length;
    }
    case 'failed': {
      const failed = contacts.filter((c) => {
        return c.contactResolution === 'failed';
      });
      return failed.length || 0;
    }
    default:
      throw new Error(`Missed label type: ${type}`);
  }
};

export const setLabels = (contacts) => [
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
