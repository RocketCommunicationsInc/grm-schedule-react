import { createContext, useContext, useEffect, useReducer } from 'react';

import data from 'data/contacts.json';
import { getDayOfYear } from 'utils/date';
import { groupByToMap, setGroup } from 'utils/grouping';
import { AppReducer } from './AppReducer';
import { initialState } from './AppInitialState';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_UCA' });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_DATA' });
  }, []);

  useEffect(() => {
    const contacts = data.map((contact) => ({
      ...contact,
      contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
      contactAOS: contact.contactBeginTimestamp,
      contactLOS: contact.contactEndTimestamp,
    }));

    const ends = contacts.map((c) => c.contactEndTimestamp);
    const starts = contacts.map((c) => c.contactBeginTimestamp);

    const payload = {
      contacts: contacts.slice(0),
      regions: setGroup(groupByToMap([...contacts], (e) => e.contactGround)),
      start: new Date(Math.min(...starts) * 1000),
      end: new Date(Math.max(...ends) * 1000),
    };

    dispatch({ type: 'SET_DATA', payload });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
