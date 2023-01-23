import { createContext, useContext, useEffect, useReducer } from 'react';

import data from 'data/contacts.json';
import { options } from 'data/options';
import { AppReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { setData } from 'utils/setData';
import { getDayOfYear } from 'utils/date';
import { randomIndex, randomInt } from 'utils/random';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const contacts = data.map((contact) => ({
      ...contact,
      contactBeginTimestamp: contact.contactBeginTimestamp * 1000,
      contactEndTimestamp: contact.contactEndTimestamp * 1000,
      contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
      contactEquipmentConfig: `Config ${randomInt(0, 5)}`,
      contactAOS: contact.contactBeginTimestamp * 1000,
      contactLOS: contact.contactEndTimestamp * 1000,
      contactMode: options.modes[randomIndex(options.modes)],
      contactPriority: options.priorities[randomIndex(options.priorities)],
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
