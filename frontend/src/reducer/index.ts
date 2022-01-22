export const initialState = {
  columns: [
    'timestamp',
    'attacker.id',
    'attacker.ip',
    'attacker.name',
    'type',
    'decoy.name',
  ],
  currentPage: 1,
  totalPages: 1,
  attacksInfo: [],
};

export const reducer = (state = initialState, action) => {
  if (action.type === 'OPTION_CLICKED') {
    return { ...state, columns: action.payload.columns };
  }

  if (action.type === 'NEXT_CLICKED') {
    return {
      ...state,
      currentPage:
        state.currentPage === state.totalPages
          ? state.totalPages
          : state.currentPage + 1,
    };
  }

  if (action.type === 'PREV_CLICKED') {
    return {
      ...state,
      currentPage:
        state.currentPage === 1 ? state.currentPage : state.currentPage - 1,
    };
  }

  if (action.type === 'PAGE_NUMBER_INPUT') {
    
    return { ...state, currentPage: action.payload.currentPage };
  }

  if (action.type === 'SET_TOTAL_PAGES') {
    return { ...state, totalPages: action.payload.totalPages };
  }

  return state;
};
