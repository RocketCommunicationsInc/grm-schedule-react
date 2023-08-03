import { useCallback } from 'react';

import { useAppContext } from 'providers/AppProvider';
import { randomContacts, randomId, randomInt } from 'utils/random';
import { setData } from 'utils/setData';
import { GenerateOptions, Ground, State } from 'Types';
import type { Contact, Priority, Status } from '@astrouxds/mock-data';
import { setHhMmSs } from 'utils/date';
import { searchKeys } from 'data/options';
import { groupByToMap, setGroup } from 'utils/grouping';
import { generateContact } from '@astrouxds/mock-data';

export const useAppActions = () => {
  const { state, dispatch } = useAppContext();

  const addContact = useCallback(
    (values: Partial<GenerateOptions>) => {
      const randomContact = generateContact(1);
      const newContacts = [
        ...state.contacts,
        {
          ...randomContact,
          _id: randomId(),
          id: randomId(),
          satellite: values.iron,
          ground: values.ground,
          equipment: values.equipment,
          equipmentConfig: `Config ${randomInt(0, 5)}`,
          dayOfYear: values.doy,
          mode: values.mode,
          priority: values.priority,
          aos: randomContact.beginTimestamp * 1000,
          los: randomContact.endTimestamp * 1000,
          beginTimestamp: randomContact.beginTimestamp * 1000,
          endTimestamp: randomContact.endTimestamp * 1000,
          rev: randomInt(1, 9999).toString().padStart(4, '0'),
          state: values.state,
        },
      ];
      const data = setData(newContacts);
      const notification = `Contact ${values.iron} ${randomContact.name} has been added.`;

      dispatch({ type: 'ADD_CONTACT', payload: { ...data, notification } });
    },
    [dispatch, state.contacts]
  );

  const modifyContact = useCallback(
    (modifiedContact: Contact) => {
      const updatedContacts = state.contacts.map(
        (contact: { id: number | string }) => {
          if (contact.id === modifiedContact.id) {
            return modifiedContact;
          }
          return contact;
        }
      );
      const data = setData(updatedContacts);
      const notification = `Changes saved to contact ${modifiedContact.satellite} ${modifiedContact.name}.`;

      dispatch({ type: 'MODIFY_CONTACT', payload: { ...data, notification } });
    },
    [dispatch, state.contacts]
  );

  const deleteContact = useCallback(
    (deleteContact: Contact) => {
      if (state.selectedContact) {
        const updatedContacts = state.contacts.filter(
          (contact: Contact) => contact.id !== state.selectedContact.id
        );

        const data = setData(updatedContacts);
        const notification = `Contact ${deleteContact.satellite} ${deleteContact.name} has been deleted.`;

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

  const filterIronAndEqupimentContacts = useCallback(
    (filter: string, value: 'iron' | 'equipment') => {
      const contacts = [...state.contacts];
      const searchedContacts = contacts.filter((contact: any) => {
        if (
          value === 'iron' &&
          contact.satellite
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase())
        ) {
          return true;
        } else if (
          value === 'equipment' &&
          contact.equipment.toLowerCase().includes(filter.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      const searchedRegionContacts = setGroup(
        groupByToMap(
          [...searchedContacts],
          (e: { ground: Date | number }) => e.ground
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

  const filterContacts = useCallback(
    (
      status: Status[],
      priority: Priority[],
      ground: Ground[],
      cState: State[]
    ) => {
      const contacts = [...state.contacts];
      let filteredContacts: any[] = [...contacts];

      if (status.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          status.includes(contact.status.toLowerCase())
        );
      }
      if (priority.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          priority.includes(contact.priority.toLowerCase())
        );
      }
      if (ground.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          ground.includes(contact.ground.toLowerCase())
        );
      }
      if (cState.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          cState.includes(contact.state.toLowerCase())
        );
      }

      const searchedRegionContacts = setGroup(
        groupByToMap(
          [...filteredContacts],
          (e: { ground: Date | number }) => e.ground
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
              contact[key] === contact.beginTimestamp ||
              contact[key] === contact.endTimestamp ||
              contact[key] === contact.aos ||
              contact[key] === contact.los
            ) {
              currentValue = setHhMmSs(contact[key]);
            } else if (contact[key]) {
              currentValue = contact[key].toString().toLowerCase();
            }
            //comparing the search value
            if (currentValue.includes(searchValue.toLowerCase()))
              matchedValue = true;
          }
        }
        return matchedValue;
      });
      const searchedRegionContacts = setGroup(
        groupByToMap(
          [...searchedContacts],
          (e: { ground: Date | number }) => e.ground
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
    filterIronAndEqupimentContacts,
  };
};
