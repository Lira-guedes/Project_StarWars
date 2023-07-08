import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import fetchApi from './service/useFetch';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi();
      setPlanets(response);
    };
    fetch();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
