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
  const { dataArray: contactsData } = useTTCGRMContacts();

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const contacts = contactsData.map((contact) => ({
      ...contact,
      contactId: contact.id,
      contactStatus: contact.status,
      contactName: contact.satellite,
      contactGround: contact.ground,
      contactSatellite: contact.satellite,
      contactEquipment: contact.equipment,
      contactState: contact.state,
      contactStep: contact.step,
      contactDetail: contact.detail,
      contactBeginTimestamp: contact.beginTimestamp * 1000,
      contactEquipmentConfig: `Config ${randomInt(1, 5)}`,
      contactEndTimestamp: contact.endTimestamp * 1000,
      contactLatitude: contact.latitude,
      contactLongitude: contact.longitude,
      contactAzimuth: contact.azimuth,
      contactElevation: contact.elevation,
      contactResolution: contact.resolution,
      contactResolutionStatus: contact.resolutionStatus,
      contactDOY: getDayOfYear(contact.beginTimestamp * 1000),

      contactAOS: contact.aos,
      contactLOS: contact.los,
      contactMode: options.modes[randomIndex(options.modes)],
      contactPriority: options.priorities[randomIndex(options.priorities)],
      contactREV: contact.rev,
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
