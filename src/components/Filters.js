import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [coluna, setColuna] = useState('');
  const [operador, setOperador] = useState('');
  const [input, setInput] = useState(0);

  const handleClick = () => {
    let filtered = planets;
    if (operador === 'maior que') {
      filtered = planets.filter((elem) => Number(elem[coluna]) > Number(input));
    } else if (operador === 'menor que') {
      filtered = planets.filter((elem) => Number(elem[coluna]) < Number(input));
    } else if (operador === 'igual a') {
      filtered = planets.filter((elem) => Number(elem[coluna]) === Number(input));
    }
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
        <option> population </option>
        <option> orbital_period </option>
        <option> diameter </option>
        <option> rotation_period </option>
        <option> surface_water </option>
      </select>

      <label htmlFor="operador"> Operador: </label>
      <select
        data-testid="comparison-filter"
        value={ operador }
        onChange={ handleOperador }
      >
        <option> maior que </option>
        <option> menor que </option>
        <option> igual a </option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ input }
        onChange={ handleInput }
      />

      <button data-testid="button-filter" onClick={ handleClick }> Filtrar </button>
    </div>
  );
}

export default Filters;
