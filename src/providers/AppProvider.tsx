import { createContext, useContext, useEffect, useReducer } from 'react';
import data from 'data/contacts.json';
import { options } from 'data/options';
import { AppReducer } from './AppReducer';
import { setData } from 'utils/setData';
import { getDayOfYear } from 'utils/date';
import { randomIndex, randomInt } from 'utils/random';

const AppContext = createContext({});

export const useAppContext = () => useContext<any>(AppContext);

type PropTypes = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: PropTypes) => {
  const initialState = {
    contacts: [],
    regions: [],
    selectedContact: null,
    modifyOptions: null,
    notification: '',
    start: new Date(),
    end: new Date(),
    ucaCount: 0,
    filteredData: [],
    searchedContacts: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const contacts = data.map((contact) => ({
      ...contact,
      contactBeginTimestamp: contact.contactBeginTimestamp * 1000,
      contactEndTimestamp: contact.contactEndTimestamp * 1000,
      contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
      contactEquipmentConfig: `Config ${randomInt(1, 5)}`,
      contactAOS: contact.contactBeginTimestamp * 1000,
      contactLOS: contact.contactEndTimestamp * 1000,
      contactMode: options.modes[randomIndex(options.modes)],
      contactPriority: options.priorities[randomIndex(options.priorities)],
      contactREV: randomInt(1, 9999).toString().padStart(4, '0'),
      contactState: options.state[randomIndex(options.state)],
    }));

    dispatch({ type: 'SET_DATA', payload: setData(contacts.slice(0, 100)) });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
