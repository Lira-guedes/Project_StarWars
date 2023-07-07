import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  return (
    <div>
      <h1> StarWars Planets Search </h1>
      <table>
        <thead>
          <th>
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
          </th>
        </thead>
        <tbody>
          { planets ? planets.map((elem) => (
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
          )) : console.log('erro')}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
