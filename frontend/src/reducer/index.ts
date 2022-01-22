export interface Results {
  'attacker.id': string;
  'attacker.ip': string;
  'attacker.name': string;
  'attacker.port': number;
  'decoy.group': string;
  'decoy.id': number;
  'decoy.ip': string;
  'decoy.name': string;
  'decoy.port': number;
  'decoy.type': string;
  id: string;
  kill_chain_phase: string;
  severity: string;
  timestamp: string;
  type: string;
  _id: string;
}

export interface AttacksInfo {
  next: {
    page: number;
    limit: 50;
  };
  previous: {
    page: number;
    limit: 50;
  };
  results: Results[];
  total: number;
}

type Columns = keyof Results;

interface State {
  columns: Columns[];
  currentPage: number;
  totalPages: number;
  attacksInfo: AttacksInfo;
}


interface OptionClickedAction {
  type: 'OPTION_CLICKED';
  payload: {
    columns: Columns[];
  };
}

interface NextClickedAction {
  type: 'NEXT_CLICKED';
}

interface PrevClickedAction {
  type: 'PREV_CLICKED';
}

interface PageNumberInputAction {
  type: 'PAGE_NUMBER_INPUT';
  payload: {
    currentPage: number;
  };
}

interface SetTotalPagesAction {
  type: 'SET_TOTAL_PAGES';
  payload: {
    totalPages: number;
  };
}

type Action =
  | OptionClickedAction
  | NextClickedAction
  | PrevClickedAction
  | PageNumberInputAction
  | SetTotalPagesAction;

export const initialState: State = {
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
  attacksInfo: {
    next: {
      page: 0,
      limit: 50,
    },
    previous: {
      page: 0,
      limit: 50,
    },
    results: [],
    total: 0,
  },
};

export const reducer = (state: State = initialState, action: Action) => {
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
