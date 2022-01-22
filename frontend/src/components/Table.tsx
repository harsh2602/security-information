import React, { memo, useEffect, useState } from 'react';
import useAppContext from '../hooks/useAppContext';
import { Results } from '../reducer';

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

  const sortByTimestamp = (event: React.MouseEvent<HTMLLabelElement>) => {
    const { innerText } = event.target as HTMLLabelElement;
    if (innerText !== 'timestamp') return;

    const sortedResults = [...results].sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
    setResponseResults(sortedResults);
  };

  if (columns && columns.length === 0) return null;
  if (responseResults === undefined) return <Loading />;

  return (
    <table>
      {/* @ts-expect-error */}
      <thead onClick={sortByTimestamp}>
        <tr>
          {columns.map((column, index) => (
            <th key={`${column}_${index}`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {responseResults &&
          responseResults.map((result) => {
            return (
              <tr key={result._id}>
                {columns.map((column: keyof Results) => {
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
