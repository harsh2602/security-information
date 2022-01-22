import React, {
  createContext,
  memo,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { initialState, reducer } from '../reducer';
const RECORDS_PER_PAGE = 50;

const AppContext = createContext(initialState);

const AppContextProvider = memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [attacksInfo, setAttacksInfo] = useState([]);

  const API_ENDPOINT = `http://localhost:3000/attacks?page=${state.currentPage}&limit=${RECORDS_PER_PAGE}`;

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((response) => {
        setAttacksInfo(response);

        const remainder = response.total % RECORDS_PER_PAGE;
        const totalPages =
          Math.floor(response.total / RECORDS_PER_PAGE) +
          (remainder > 0 && remainder < RECORDS_PER_PAGE && 1);

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
