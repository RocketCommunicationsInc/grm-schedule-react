import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { getDayOfYear } from 'utils/date';
import { randomId } from 'utils/randomId';
import { setData } from 'utils/setData';

export const useAppActions = () => {
  const { state, dispatch } = useAppContext();

  const addContact = useCallback(
    (contact) => {
      const newContacts = [
        ...state.contacts,
        {
          ...contact,
          contactId: randomId(),
          contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
          contactAOS: contact.contactBeginTimestamp,
          contactLOS: contact.contactEndTimestamp,
        },
      ];

      dispatch({ type: 'ADD_CONTACT', payload: setData(newContacts) });
    },
    [dispatch, state.contacts]
  );

  const modifyContact = useCallback(
    (contactId) => {
      dispatch({ type: 'MODIFY_CONTACT', payload: { contactId } });
    },
    [dispatch]
  );

  return { addContact, modifyContact };
};
