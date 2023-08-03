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
          doy: payload.dayOfYear,
          equipment: payload.equipment,
          ground: payload.ground,
          pass: 0,
          iron: payload.satellite,
          priority: payload.priority,
          mode: payload.mode,
          satellite: payload.name,
          aos: payload.aos,
          los: payload.los,
          rev: payload.rev,
          state: payload.state,
        },
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
