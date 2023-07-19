import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { planets,
    // setPlanets,
    filteredPlanets,
    setFilteredPlanets } = useContext(PlanetsContext);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [input, setInput] = useState(0);
  const [filters, setFilters] = useState([]);
  const [columnsOptions, setColumnsOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  const handleClick = () => {
    setFilters([...filters, { coluna, operador, input }]);
    const filtered = filteredPlanets.filter((elem) => {
      if (operador === 'maior que') {
        return Number(elem[coluna]) > Number(input);
      } if (operador === 'menor que') {
        return Number(elem[coluna]) < Number(input);
      }
      return Number(elem[coluna]) === Number(input);
    });
    setFilteredPlanets(filtered);
    setColumnsOptions(columnsOptions.filter((elem) => elem !== coluna));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const columnName = event.target.name;
    const filt = filters.filter((filter) => filter.coluna !== columnName);
    setFilters(filt);
    const filtered = planets.filter((elem) => filt.every((filter) => {
      if (filter.operador === 'maior que') {
        return Number(elem[filter.coluna]) > Number(filter.input);
      } if (filter.operador === 'menor que') {
        return Number(elem[filter.coluna]) < Number(filter.input);
      }
      return Number(elem[filter.coluna]) === Number(filter.input);
    }));
    setFilteredPlanets(filtered);
    setColumnsOptions([...columnsOptions, columnName]);
  };

  const handleDeleteAll = (event) => {
    event.preventDefault();
    setFilters([]);
    setFilteredPlanets(planets);
    setColumnsOptions(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
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
        id="coluna"
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
        id="operador"
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
      <button
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remover Filtros
      </button>

      {filters && filters.map((elem, index) => (
        <div key={ index } data-testid="filter">
          <span>{`${elem.coluna} ${elem.operador} ${elem.input}`}</span>
          <button
            data-testid="button-delete"
            type="button"
            name={ elem.coluna }
            onClick={ handleDelete }
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
