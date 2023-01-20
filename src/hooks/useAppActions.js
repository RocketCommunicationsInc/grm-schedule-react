import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { setData } from 'utils/setData';
import { randomContacts, randomId } from 'utils/random';

export const useAppActions = () => {
  const { state, dispatch } = useAppContext();

  const addContact = useCallback(
    (values) => {
      const randomContact = randomContacts(1)[0];
      const newContacts = [
        ...state.contacts,
        {
          ...randomContact,
          _id: randomId(),
          contactId: randomId(),
          contactName: values.iron,
          contactGround: values.ground,
          contactEquipment: values.equipment,
          contactDOY: values.doy,
          contactMode: values.mode,
          contactPriority: values.priority,
          contactAOS: randomContact.contactBeginTimestamp,
          contactLOS: randomContact.contactEndTimestamp,
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
