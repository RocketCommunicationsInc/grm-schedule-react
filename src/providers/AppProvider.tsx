import { createContext, useContext, useEffect, useReducer } from 'react';
import data from 'data/contacts.json';
import { options } from 'data/options';
import { AppReducer } from './AppReducer';
import { setData } from 'utils/setData';
import { getDayOfYear } from 'utils/date';
import { randomIndex, randomInt } from 'utils/random';
import { useTTCGRMContacts } from '@astrouxds/mock-data';

const AppContext = createContext({});

export const useAppContext = () => useContext<any>(AppContext);

type PropTypes = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: PropTypes) => {
  const { dataArray: contactsData } = useTTCGRMContacts();

  const initialState = {
    contacts: [],
    regions: [],
    selectedContact: null,
    modifyOptions: null,
    notification: '',
    start: new Date(),
    end: new Date(),
    ucaCount: 0,
    searchedContacts: [],
    searchedRegionContacts: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    //   const contacts = contactsData.map((contact) => ({
    //     ...contact,
    //     beginTimestamp: contact.beginTimestamp * 1000,
    //     endTimestamp: contact.endTimestamp * 1000,
    //     dayOfYear: getDayOfYear(contact.beginTimestamp * 1000),
    //     equipmentConfig: `Config ${randomInt(1, 5)}`,
    //     aos: contact.beginTimestamp * 1000,
    //     los: contact.endTimestamp * 1000,
    //     mode: options.modes[randomIndex(options.modes)],
    //     priority: options.priorities[randomIndex(options.priorities)],
    //     rev: randomInt(1, 9999).toString().padStart(4, '0'),
    //     state: options.state[randomIndex(options.state)],
    //   }));

    dispatch({ type: 'SET_DATA', payload: setData(contactsData) });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
