import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import App from './App';

test('renders keypad actions', () => {
  render(<App />);

  const resetButton = screen.getByText(/Reset/);
  const updateButton = screen.getByText(/Update/);

  expect(resetButton).toBeInTheDocument();
  expect(updateButton).toBeInTheDocument();
});
