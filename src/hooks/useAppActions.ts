import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { randomContacts, randomId, randomInt } from 'utils/random';
import { setData } from 'utils/setData';
import {
  Contact,
  GenerateOptions,
  Ground,
  Priority,
  State,
  Status,
} from 'Types';
import { setHhMmSs } from 'utils/date';
import { searchKeys } from 'data/options';
import { groupByToMap, setGroup } from 'utils/grouping';

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
          contactState: values.state,
          contactDetail: values.details,
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

  const filterContacts = useCallback(
    (
      status: Status[],
      priority: Priority[],
      ground: Ground[],
      cState: State[],
      ironValue: String,
      equipmentValue: String
    ) => {
      const contacts = [...state.contacts];
      let filteredContacts: any[] = [...contacts];

      if (status.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          status.includes(contact.contactStatus.toLowerCase())
        );
      }
      if (priority.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          priority.includes(contact.contactPriority.toLowerCase())
        );
      }
      if (ground.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          ground.includes(contact.contactGround.toLowerCase())
        );
      }
      if (cState.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          cState.includes(contact.contactState.toLowerCase())
        );
      }

      //IRON filter and Equipment Filter
      filteredContacts = filteredContacts.filter((contact) => {
        const matchIronValue = contact.contactName
          .toString()
          .toLowerCase()
          .includes(ironValue.toLowerCase());

        const matchEquipmentValue = contact.contactEquipment
          .toString()
          .toLowerCase()
          .includes(equipmentValue.toLowerCase());
        return matchIronValue && matchEquipmentValue;
      });

      const searchedRegionContacts = setGroup(
        groupByToMap(
          [...filteredContacts],
          (e: { contactGround: Date | number }) => e.contactGround
        )
      );
      dispatch({
        type: 'REGION_CONTACTS',
        payload: { searchedRegionContacts: searchedRegionContacts },
      });
      dispatch({
        type: 'SEARCHED_CONTACTS',
        payload: { searchedContacts: filteredContacts },
      });
    },
    [dispatch, state.contacts]
  );

  const searchContacts = useCallback(
    (searchValue: string) => {
      const contacts = [...state.contacts];
      const searchedContacts = contacts.filter((contact: any) => {
        let matchedValue = false;
        for (const key in contact) {
          //searchKeys are the only keys we want data from
          if (searchKeys.includes(key)) {
            let currentValue = '';
            if (
              contact[key] === contact.contactBeginTimestamp ||
              contact[key] === contact.contactEndTimestamp ||
              contact[key] === contact.contactAOS ||
              contact[key] === contact.contactLOS
            ) {
              currentValue = setHhMmSs(contact[key]);
            } else if (contact[key]) {
              currentValue = contact[key].toString().toLowerCase();
            }
            //comparing the search value
            if (currentValue.includes(searchValue)) matchedValue = true;
          }
        }
        return matchedValue;
      });
      const searchedRegionContacts = setGroup(
        groupByToMap(
          [...searchedContacts],
          (e: { contactGround: Date | number }) => e.contactGround
        )
      );
      dispatch({
        type: 'REGION_CONTACTS',
        payload: { searchedRegionContacts: searchedRegionContacts },
      });
      dispatch({
        type: 'SEARCHED_CONTACTS',
        payload: { searchedContacts: searchedContacts },
      });
    },
    [dispatch, state.contacts]
  );

  return {
    addContact,
    modifyContact,
    deleteContact,
    resetNotification,
    resetSelectedContact,
    setSelectedContact,
    filterContacts,
    searchContacts,
  };
};
