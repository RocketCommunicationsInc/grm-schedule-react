import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { randomContacts, randomId, randomInt } from 'utils/random';
import { setData } from 'utils/setData';
import { Contact, GenerateOptions } from 'Types';

export const useAppActions = () => {
  const { state, dispatch } = useAppContext();

  const addContact = useCallback(
    (values: Partial<GenerateOptions>) => {
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
    (modifiedContact: Contact) => {
      const updatedContacts = state.contacts.map(
        (contact: { contactId: number | string }) => {
          if (contact.contactId === modifiedContact.contactId) {
            return modifiedContact;
          }

          return contact;
        }
      );
      const data = setData(updatedContacts);
      const notification = `Changes saved to contact ${modifiedContact.contactName} ${modifiedContact.contactSatellite}.`;

      dispatch({ type: 'MODIFY_CONTACT', payload: { ...data, notification } });
    },
    [dispatch, state.contacts]
  );

  const deleteContact = useCallback(
    (deleteContact: Contact) => {
      if (state.selectedContact) {
        const updatedContacts = state.contacts.filter(
          (contact: Contact) =>
            contact.contactId !== state.selectedContact.contactId
        );

        const data = setData(updatedContacts);
        const notification = `Contact ${deleteContact.contactName} ${deleteContact.contactSatellite} has been deleted.`;

        console.log(state.notification);

        dispatch({
          type: 'DELETE_CONTACT',
          payload: { ...data, notification },
        });
      }
    },
    [dispatch, state]
  );

  const setSelectedContact = useCallback(
    (contact: Contact) => {
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
    deleteContact,
    resetNotification,
    resetSelectedContact,
    setSelectedContact,
  };
};
