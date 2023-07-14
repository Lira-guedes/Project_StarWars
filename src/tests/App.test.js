import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.setTimeout(10000)

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
    expect(button).toBeInTheDocument();

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
    userEvent.selectOptions(column,['orbital_period']);
    userEvent.selectOptions(comparison, ['igual a']);
    // userEvent.type(value, '1234567');
    expect(column.value).toBe('orbital_period');
    expect(comparison.value).toBe('igual a');
    // expect(value.value).toBe('1234567');
  });
  // test('Testando Filtros por Nome', () => {
  //   render(<App />);
  //   const name = screen.getByTestId('name-filter');
  //   userEvent.type(name, 'Bespin');
  //   expect(screen.getByText(/Bespin/i)).toBeInTheDocument();
  //   userEvent.type(name, 'Coruscant');
  //   expect(screen.getByText(/Bespin/i)).not.toBeInTheDocument();
  //   expect(screen.getByText(/Coruscant/i)).toBeInTheDocument();
  // });
  // it('Adiciona Filtro quando botão é clicado', async () => {
  //   render(<App />);
  //   const column = screen.getByTestId('column-filter');
  //   const comparison = screen.getByTestId('comparison-filter');
  //   const value = screen.getByTestId('value-filter');
  //   const buttonElement = screen.getByTestId('button-filter');
  //   userEvent.selectOptions(column, 'population');
  //   userEvent.selectOptions(comparison, 'maior que');
  //   userEvent.type(value, '100000000000');
  //   userEvent.click(buttonElement);
  //   await waitFor(() => {
  //     expect(screen.getByText(/Coruscant/)).toBeInTheDocument();
  //   }, { timeout: 10000 });
  //   // expect(screen.getByText(/population/)).toBeInTheDocument();
  //   // expect(screen.getByText(/maior que/i)).toBeInTheDocument();
  //   // expect(screen.getByText(/100000000000/)).toBeInTheDocument();
  // });
});
