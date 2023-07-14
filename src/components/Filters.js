import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [input, setInput] = useState(0);
  const [filters, setFilters] = useState([]);
  const [columnsOptions, setColumnsOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
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
    setPlanets(filtered);
    setColumnsOptions(columnsOptions.filter((elem) => elem !== coluna));
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

  useEffect(() => {
    setColuna(columnsOptions[0]);
  }, [columnsOptions]);

  return (
    <div>
      <label htmlFor="coluna"> Coluna: </label>
      <select
        data-testid="column-filter"
        value={ coluna }
        onChange={ handleColuna }
      >
        {
          columnsOptions.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))
        }
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
