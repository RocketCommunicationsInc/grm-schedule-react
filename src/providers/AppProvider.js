import { createContext, useContext, useEffect, useReducer } from 'react';

import data from 'data/contacts.json';
import { options } from 'data/options';
import { AppReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { setData } from 'utils/setData';
import { getDayOfYear } from 'utils/date';
import { randomIndex } from 'utils/random';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const contacts = data.map((contact) => ({
      ...contact,
      contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
      contactAOS: contact.contactBeginTimestamp,
      contactLOS: contact.contactEndTimestamp,
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
