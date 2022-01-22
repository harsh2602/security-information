import React, { memo, useEffect, useState } from 'react';
import useAppContext from '../hooks/useAppContext';

import Loading from './Loading';

const Table = memo(() => {
  const {
    columns,
    attacksInfo: { results },
  } = useAppContext();
  const [responseResults, setResponseResults] = useState(results);

  useEffect(() => {
    setResponseResults(results);
  }, [results]);

  const sortByTimestamp = (event) => {
    if (event.target.innerText !== 'timestamp') return;

    const sortedResults = [...results].sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
    setResponseResults(sortedResults);
  };

  if (columns && columns.length === 0) return null;
  if (responseResults === undefined) return <Loading />;

  return (
    <table>
      <thead onClick={sortByTimestamp}>
        <tr>
          {columns.map((column, index) => (
            <th value={column} key={`${column}_${index}`}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {responseResults &&
          responseResults.map((result) => {
            return (
              <tr key={result._id}>
                {columns.map((column) => {
                  return (
                    <td key={`${result.id}_${column}`}>{result[column]}</td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
});

export default Table;
