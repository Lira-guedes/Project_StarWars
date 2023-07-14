import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filter from './Filters';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const [filter, setFilter] = useState('');

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };
  console.log(planets);
  const filterPlanets = planets.length > 0 && planets.filter(
    (elem) => elem.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1> StarWars Planets Search </h1>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filter }
          onChange={ handleChange }
        />
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th> Nome </th>
            <th> Rotation Period </th>
            <th> Orbital Period </th>
            <th> Diameter </th>
            <th> Climate </th>
            <th> Gravity </th>
            <th> Terrain </th>
            <th> Surface Water </th>
            <th> Population </th>
            <th> Films </th>
            <th> Created </th>
            <th> Edited </th>
            <th> Url </th>
          </tr>
        </thead>
        <tbody>
          {planets.length > 0 && filterPlanets.map((elem) => (
            <tr key={ elem.name }>
              <td>{ elem.name }</td>
              <td>{ elem.rotation_period }</td>
              <td>{ elem.orbital_period }</td>
              <td>{ elem.diameter }</td>
              <td>{ elem.climate }</td>
              <td>{ elem.gravity }</td>
              <td>{ elem.terrain }</td>
              <td>{ elem.surface_water }</td>
              <td>{ elem.population }</td>
              <td>{ elem.films }</td>
              <td>{ elem.created }</td>
              <td>{ elem.edited }</td>
              <td>{ elem.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
