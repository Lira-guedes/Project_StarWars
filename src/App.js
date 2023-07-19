import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import fetchApi from './service/fetchApi';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi();
      const data = await response.json();
      const planet = data.results.filter((elem) => delete elem.residents);
      setPlanets(planet);
      setFilteredPlanets(planet);
    };
    fetch();
  }, []);

  return (
    <PlanetsContext.Provider
      value={ { planets, setPlanets, filteredPlanets, setFilteredPlanets } }
    >
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
