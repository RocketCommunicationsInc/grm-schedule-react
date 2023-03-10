import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { randomContacts, randomId, randomInt } from 'utils/random';
import { setData } from 'utils/setData';

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
          contactREV: randomInt(1, 9999).toString().padStart(4, '0'),
        },
      ];
      const data = setData(newContacts);
      const notification = `Contact ${values.iron} ${randomContact.contactSatellite} has been added.`;

      dispatch({ type: 'ADD_CONTACT', payload: { ...data, notification } });
    },
    [dispatch, state.contacts]
  );

  const modifyContact = useCallback(
    (modifiedContact) => {
      const updatedContacts = state.contacts.map((contact) => {
        if (contact.contactId === modifiedContact.contactId) {
          return modifiedContact;
        }

        return contact;
      });
      const data = setData(updatedContacts);
      const notification = `Changes saved to contact ${modifiedContact.contactName} ${modifiedContact.contactSatellite}.`;

      dispatch({ type: 'MODIFY_CONTACT', payload: { ...data, notification } });
    },
    [dispatch, state.contacts]
  );

  const setSelectedContact = useCallback(
    (contact) => {
      dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
    },
    [dispatch]
  );

  const resetNotification = useCallback(() => {
    dispatch({ type: 'RESET_NOTIFICATION' });
  }, [dispatch]);

  const resetSelectedContact = useCallback(() => {
    dispatch({ type: 'RESET_SELECTED_CONTACT' });
  }, [dispatch]);

  return {
    addContact,
    modifyContact,
    resetNotification,
    resetSelectedContact,
    setSelectedContact,
  };
};
