import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Filters from '../components/Filters';

jest.setTimeout(20000)

describe(' ', () => {
  test('Testando Componente Table', async () => {
    render(<App />);
    const name = screen.getByTestId('name-filter');
    await waitFor(() => {
      expect(screen.getByText('Alderaan')).toBeInTheDocument();
    }, { timeout: 10000 });
    expect(name).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotation Period/i)).toBeInTheDocument();
    expect(screen.getByText(/Orbital Period/i)).toBeInTheDocument();
    expect(screen.getByText(/Diameter/)).toBeInTheDocument();
    expect(screen.getByText(/Climate/i)).toBeInTheDocument();
    expect(screen.getByText(/Gravity/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain/i)).toBeInTheDocument();
    expect(screen.getByText(/Surface Water/i)).toBeInTheDocument();
    expect(screen.getByText(/Population/)).toBeInTheDocument();
    expect(screen.getByText(/Films/)).toBeInTheDocument();
    expect(screen.getByText(/Created/i)).toBeInTheDocument();
    expect(screen.getByText(/Edited/i)).toBeInTheDocument();
    expect(screen.getByText(/Url/i)).toBeInTheDocument();
  });
  test('Testando Renderizações dos Filtros', async () => {
    render(<App />);
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
      const button = screen.getByTestId('button-filter');

    expect(screen.getByLabelText('Coluna:')).toBeInTheDocument();
    expect(screen.getByLabelText('Operador:')).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '10000');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Dagobah/)).toBeInTheDocument();
      expect(screen.getByText(/Endor/)).toBeInTheDocument();
      expect(screen.getByText(/Hoth/)).toBeInTheDocument();
    }, { timeout: 10000 });
  });
  test('Testando Update de Valores dos Filtros', () => {
    render(<App />);
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');    
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column,['orbital_period']);
    userEvent.selectOptions(comparison, ['igual a']);
    // userEvent.type(value, '1234567');
    expect(column.value).toBe('orbital_period');
    expect(comparison.value).toBe('igual a');
    // expect(value.value).toBe('1234567');
  });

  test('Testando Filtros de coluna', async () => {
    render(<App />);
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
      const button = screen.getByTestId('button-filter');

    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '10');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Alderaan/)).toBeInTheDocument();
      expect(screen.getByText(/Endor/)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    }, { timeout: 10000 });

  });

  test('Testando Filtros por Nome', async () => {
    render(<App />);
    const name = screen.getByTestId('name-filter');
    expect(name).toBeInTheDocument();

    userEvent.type(name, 'Bespin');
    expect(name.value).toBe('Bespin')
    await waitFor(() => {
          expect(screen.getAllByRole('row')).toHaveLength(2);
      expect(screen.getByText(/Bespin/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    userEvent.clear(name)
    userEvent.type(name, 'Coruscant');
    expect(name.value).toBe('Coruscant')
    await waitFor(() => {
      expect(screen.getByText(/Coruscant/i)).toBeInTheDocument();
    }, { timeout: 10000 });
  });

  // });
  test('Adiciona Filtro quando botão é clicado', async () => {
    render(<App />);
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const buttonElement = screen.getByTestId('button-filter');

    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.clear(value)
    userEvent.type(value, '123456');
    userEvent.click(buttonElement);

    expect(screen.getByText(/population maior que 123456/)).toBeInTheDocument();
    expect(screen.getAllByText(/delete/)[0]).toBeInTheDocument();

  });

    test('Remove um Filtro quando botão é clicado', async () => {
    render(<App />);
        await waitFor(() => {
        expect(screen.getByText(/Yavin IV/)).toBeInTheDocument();
        expect(screen.getByText(/Hoth/)).toBeInTheDocument();   
   }, { timeout: 10000 });
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const buttonElement = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.clear(value)
    userEvent.type(value, '123456');
    userEvent.click(buttonElement);

    expect(screen.getByText(/population maior que 123456/)).toBeInTheDocument();
    expect(screen.getAllByText(/delete/)[0]).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {name: /delete/i});
    act(() => userEvent.click(deleteBtn));

    expect(screen.queryByText(/population maior que 123456/)).not.toBeInTheDocument();
    expect(screen.queryByText(/delete/)).not.toBeInTheDocument();
    
    expect(screen.getByText(/Yavin IV/)).toBeInTheDocument();
    expect(screen.getByText(/Hoth/)).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(11);

  });

    test('Remove todos os filtros ', () => {
    const filters = [
      { coluna: 'population', operador: 'maior que', input: 100000 },
      { coluna: 'orbital_period', operador: 'menor que', input: 200 },
    ];
    render(<App />);

    const removeFiltersButton = screen.getByTestId('button-remove-filters');
    userEvent.click(removeFiltersButton);

    expect(screen.getByTestId('column-filter')[0].textContent).toBe('population');
    expect(screen.getByTestId('column-filter')[1].textContent).toBe('orbital_period');
    expect(screen.getByTestId('column-filter')[2].textContent).toBe('diameter');
    expect(screen.getByTestId('column-filter')[3].textContent).toBe('rotation_period');
    expect(screen.getByTestId('column-filter')[4].textContent).toBe('surface_water');
  });

  //   test.only('should delete a filter when the delete button is clicked', () => {
  //   // Mock the filters array
  //   const filters = [
  //     { coluna: 'population', operador: 'maior que', input: 100000 },
  //     { coluna: 'orbital_period', operador: 'menor que', input: 200 },
  //   ];
  //   const setFilteredPlanetsMock = jest.fn();

  //   // Render the component with mock data
  //    render(<App />);


  //   // Select the delete button for the first filter
  //   const deleteButton = screen.getByText('delete');

  //   // Click the delete button
  //   fireEvent.click(deleteButton);

  //   // Check if the setFilteredPlanetsMock function was called with the correct filtered array
  //   expect(setFilteredPlanetsMock).toHaveBeenCalledTimes(1);
  //   expect(setFilteredPlanetsMock).toHaveBeenCalledWith([
  //     { coluna: 'orbital_period', operador: 'menor que', input: 200 },
  //   ]);
  // });
});
