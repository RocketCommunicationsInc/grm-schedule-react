export const AppReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'ADD_CONTACT': {
      return { ...state, ...payload };
    }

    case 'MODIFY_CONTACT': {
      return {
        ...state,
        ...payload,
        selectedContact: null,
        modifyOptions: null,
      };
    }

    case 'DELETE_CONTACT': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'RESET_NOTIFICATION': {
      return { ...state, notification: '' };
    }

    case 'RESET_SELECTED_CONTACT': {
      return { ...state, selectedContact: null, modifyOptions: null };
    }

    case 'SET_CONTACT_OPTIONS': {
      return { ...state };
    }

    case 'SET_DATA': {
      return { ...state, ...payload };
    }

    case 'SET_SELECTED_CONTACT': {
      return {
        ...state,
        selectedContact: payload,
        modifyOptions: {
          doy: payload.contactDOY,
          equipment: payload.contactEquipment,
          ground: payload.contactGround,
          pass: 0,
          iron: payload.contactName,
          priority: payload.contactPriority,
          mode: payload.contactMode,
          satellite: payload.contactSatellite,
          aos: payload.contactAOS,
          los: payload.contactLOS,
          rev: payload.contactREV,
          state: payload.contactState
        },
      };
    }

    case 'FILTER_CONTACTS': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'SEARCHED_CONTACTS': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'REGION_CONTACTS': {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
