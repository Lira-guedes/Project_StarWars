import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [input, setInput] = useState(0);
  const [filters, setFilters] = useState([]);

  const handleClick = () => {
    setFilters([...filters, { coluna, operador, input }]);
    const filtered = planets.filter((elem) => {
      if (operador === 'maior que') {
        return Number(elem[coluna]) > Number(input);
      } if (operador === 'menor que') {
        return Number(elem[coluna]) < Number(input);
      }
      return Number(elem[coluna]) === Number(input);
    });
    return setPlanets(filtered);
  };

  const handleColuna = ({ target }) => {
    setColuna(target.value);
  };
  const handleOperador = ({ target }) => {
    setOperador(target.value);
  };
  const handleInput = ({ target }) => {
    setInput(target.value);
  };

  return (
    <div>
      <label htmlFor="coluna"> Coluna: </label>
      <select
        data-testid="column-filter"
        value={ coluna }
        onChange={ handleColuna }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <label htmlFor="operador"> Operador: </label>
      <select
        data-testid="comparison-filter"
        value={ operador }
        onChange={ handleOperador }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ input }
        onChange={ handleInput }
      />
      <button data-testid="button-filter" onClick={ handleClick }> Filtrar </button>

      {filters && filters.map((elem, index) => (
        <div key={ index }>
          <span>{elem.coluna}</span>
          <span>{elem.operador}</span>
          <span>{elem.input}</span>
        </div>
      ))}
    </div>
  );
}

export default Filters;
