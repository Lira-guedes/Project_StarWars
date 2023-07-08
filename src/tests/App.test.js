import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe(' ', () => {
  const name = screen.getByTestId('name-filter');
  const column = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter');
  const value = screen.getByTestId('value-filter');
  const button = screen.getByTestId('button-filter');
  test('Testando Componente Table', () => {
    render(<App />);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotation Period/i)).toBeInTheDocument();
    expect(screen.getByText(/Orbital Period/i)).toBeInTheDocument();
    expect(screen.getByText(/Diameter/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate/i)).toBeInTheDocument();
    expect(screen.getByText(/Gravity/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain/i)).toBeInTheDocument();
    expect(screen.getByText(/Surface Water/i)).toBeInTheDocument();
    expect(screen.getByText(/Population/i)).toBeInTheDocument();
    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    expect(screen.getByText(/Created/i)).toBeInTheDocument();
    expect(screen.getByText(/Edited/i)).toBeInTheDocument();
    expect(screen.getByText(/Url/i)).toBeInTheDocument();
  });
  test('Testando Renderizações dos Filtros', () => {
    render(<App />);
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '10000');
    userEvent.click(button);

    expect(screen.getByText(/Dagobah/i)).toBeInTheDocument();
    expect(screen.getByText(/Endor/i)).toBeInTheDocument();
    expect(screen.getByText(/Hoth/i)).toBeInTheDocument();
  });
  test('Testando Update de Valores dos Filtros', () => {
    render(<App />);
    fireEvent.change(column, { target: { name: 'column', value: 'orbital_period' } });
    fireEvent.change(comparison, { target: { name: 'comparision', value: 'igual a' } });
    fireEvent.change(value, { target: { name: 'number', value: '1234567' } });
    expect(column.value).toBe('orbital_period');
    expect(comparison.value).toBe('igual a');
    expect(value.value).toBe('1234567');
  });
  test('Testando Filtros por Nome', () => {
    render(<App />);
    userEvent.type(name, 'Bespin');
    expect(screen.getByText(/Bespin/i)).toBeInTheDocument();
    userEvent.type(name, 'Coruscant');
    expect(screen.getByText(/Bespin/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Coruscant/i)).toBeInTheDocument();
  });
  test('', () => {
    render(<App />);
  });

});
