import { createContext, useContext, useEffect, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import { setData } from 'utils/setData';
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
    dispatch({ type: 'SET_DATA', payload: setData(contactsData) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
