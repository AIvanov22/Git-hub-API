import React from 'react';
import { Search } from './components/Search/Search';
import EnhancedTable from './components/Table/Table';
import {ErrorHandler} from './components/Common/ErrorHandler/ErrorHandler';
import './App.css';

function App () {
  return (
    <>
      <Search />
      <EnhancedTable />
      <ErrorHandler />
    </>
  );
}

export default App;
