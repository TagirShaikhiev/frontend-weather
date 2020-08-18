import React from 'react';
import { Table } from './components/Table';
import { Provider } from 'mobx-react'
import { listOfCurrentPlace } from './components/currentList';

const stores = {
  listOfPlaces: new listOfCurrentPlace()
}

function App() {
  return (
    <Provider {...stores} className="container col-4"> 
      <Table /> 
    </Provider> 
  );
}

export default App;
