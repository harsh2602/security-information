import React, { useRef, useState } from 'react';
import useAppContext from '../hooks/useAppContext';

const Pagination = () => {
  const { currentPage, columns, totalPages, dispatch } = useAppContext();
  const [page, setPage] = useState(currentPage);
  const [invalidInput, setInvalidInput] = useState(false);

  const inputEl = useRef<HTMLInputElement | null>(null);

  const prev = () => {
    setPage(page - 1);
    dispatch &&
      dispatch({
        type: 'PREV_CLICKED',
      });
  };

  const next = () => {
    setPage(page + 1);
    dispatch &&
      dispatch({
        type: 'NEXT_CLICKED',
      });
  };

  const goToPage = () => {
    const { value } = inputEl.current as HTMLInputElement;

    if (+value <= 0 || +value > totalPages || isNaN(+value)) {
      setInvalidInput(true);
      return;
    }

    setInvalidInput(false);
    setPage(+value);

    dispatch &&
      dispatch({
        type: 'PAGE_NUMBER_INPUT',
        payload: {
          currentPage: +value,
        },
      });
  };

  if (columns && columns.length === 0) return null;

  return (
    <div>
      <div>
        <button onClick={prev} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div>
        <input
          ref={inputEl}
          type='text'
          value={page}
          onChange={(e) => setPage(+e.target.value)}
        />
        <button onClick={goToPage}>Submit</button>
      </div>
      {invalidInput && <div style={{ color: 'red' }}>Invalid Input</div>}
    </div>
  );
};

export default Pagination;
