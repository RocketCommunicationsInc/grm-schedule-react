export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_CONTACT': {
      return { ...state, ...payload };
    }

    case 'MODIFY_CONTACT': {
      // TODO: need to finsh this next
      console.log('MODIFY CONTACT', payload);

      return {
        ...state,
        contacts: [...state.contacts],
        selectedContact: null,
        modifyOptions: null,
      };
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
        },
      };
    }

    case 'RESET_SELECTED_CONTACT': {
      return { ...state, selectedContact: null, modifyOptions: null };
    }

    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
