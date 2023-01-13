import data from 'data/contacts.json';
import { getDayOfYear } from 'utils/date';
import { groupByToMap, setGroup } from 'utils/grouping';

export const AppReducer = (state, { type }) => {
  switch (type) {
    case 'SET_DATA': {
      const contacts = data.map((contact) => ({
        ...contact,
        contactResolutionStatus: contact.contactResolutionStatus,
        contactState: contact.contactState,
        contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
        contactAOS: contact.contactBeginTimestamp,
        contactLOS: contact.contactEndTimestamp,
      }));

      const ends = data.map((c) => c.contactEndTimestamp);
      const starts = data.map((c) => c.contactBeginTimestamp);

      return {
        ...state,
        contacts: contacts.slice(0, 50),
        regions: setGroup(groupByToMap([...data], (e) => e.contactGround)),
        start: new Date(Math.min(...starts) * 1000),
        end: new Date(Math.max(...ends) * 1000),
      };
    }

    case 'UPDATE_UCA': {
      const ucaCount = state.ucaCount < 100 ? state.ucaCount + 1 : 0;
      return { ...state, ucaCount };
    }

    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
