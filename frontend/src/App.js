import React, { useState } from 'react';

import { AppContextProvider } from './context/AppContext';
import Table from './components/Table';
import SelectColumns from './components/SelectColumns';
import Pagination from './components/Pagination';
import Graph from './components/Graph';

import './App.css';

const App = () => {
  const [isTable, setIsTable] = useState(true);

  const toggleView = () => {
    setIsTable(!isTable);
  };

  return (
    <div className='App'>
      <button onClick={toggleView}>{`Show ${
        isTable ? 'Table' : 'Graph'
      }`}</button>
      {isTable ? (
        <Graph />
      ) : (
        <AppContextProvider>
          <SelectColumns />
          <Table />
          <Pagination />
        </AppContextProvider>
      )}
    </div>
  );
};

export default App;
