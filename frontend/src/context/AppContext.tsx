import React, {
  createContext,
  memo,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Action, AttacksInfo, initialState, reducer, State } from '../reducer';

interface Context extends State {
  dispatch?: React.Dispatch<Action>;
}

const RECORDS_PER_PAGE = 50;

const AppContext = createContext<Context>(initialState);

const AppContextProvider = memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [attacksInfo, setAttacksInfo] = useState<AttacksInfo>({
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
  });

  const API_ENDPOINT = `http://localhost:3000/attacks?page=${state.currentPage}&limit=${RECORDS_PER_PAGE}`;

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((response: AttacksInfo) => {
        setAttacksInfo(response);

        const remainder = response.total % RECORDS_PER_PAGE;
        let rest = 0;

        if (remainder > 0 && remainder < RECORDS_PER_PAGE) {
          rest = 1;
        }
        const totalPages = Math.floor(response.total / RECORDS_PER_PAGE) + rest;

        dispatch({
          type: 'SET_TOTAL_PAGES',
          payload: {
            totalPages,
          },
        });
      });
  }, [API_ENDPOINT]);

  const value = useMemo(
    () => ({ ...state, attacksInfo, dispatch }),
    [attacksInfo, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

export { AppContext, AppContextProvider };
