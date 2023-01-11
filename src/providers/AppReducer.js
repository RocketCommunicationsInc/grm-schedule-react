export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_UCA': {
      const ucaCount = state.ucaCount < 100 ? state.ucaCount + 1 : 0;
      return { ...state, ucaCount };
    }
    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
