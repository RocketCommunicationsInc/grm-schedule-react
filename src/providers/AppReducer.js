export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_CONTACT': {
      return { ...state, ...payload };
    }

    case 'MODIFY_CONTACT': {
      const contact = state.contacts.find(
        ({ contactId }) => contactId === payload.contactId
      );
      console.log('MODIFY CONTACT', contact);

      return {
        ...state,
        contacts: [
          ...state.contacts.filter(
            ({ contactId }) => contactId !== payload.contactId
          ),
          {
            ...contact,
            contactEquipment: 'NEW EQUIPMENT',
          },
        ],
      };
    }

    case 'SET_DATA': {
      return { ...state, ...payload };
    }

    case 'UPDATE_UCA': {
      const ucaCount = state.ucaCount < 100 ? state.ucaCount + 1 : 0;
      return { ...state, ucaCount };
    }

    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
