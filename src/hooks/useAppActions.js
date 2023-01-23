import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { setData } from 'utils/setData';
import { randomContacts, randomId, randomInt } from 'utils/random';

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
          contactEquipmentConfig: `Config ${randomInt(0, 5)}`,
          contactDOY: values.doy,
          contactMode: values.mode,
          contactPriority: values.priority,
          contactAOS: randomContact.contactBeginTimestamp * 1000,
          contactLOS: randomContact.contactEndTimestamp * 1000,
          contactBeginTimestamp: randomContact.contactBeginTimestamp * 1000,
          contactEndTimestamp: randomContact.contactEndTimestamp * 1000,
        },
      ];

      dispatch({ type: 'ADD_CONTACT', payload: setData(newContacts) });
    },
    [dispatch, state.contacts]
  );

  const modifyContact = useCallback(
    (values) => {
      dispatch({ type: 'MODIFY_CONTACT', payload: values });
    },
    [dispatch]
  );

  const setSelectedContact = useCallback(
    (contact) => {
      dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
    },
    [dispatch]
  );

  const resetSelectedContact = useCallback(() => {
    dispatch({ type: 'RESET_SELECTED_CONTACT' });
  }, [dispatch]);

  return {
    addContact,
    modifyContact,
    resetSelectedContact,
    setSelectedContact,
  };
};
