import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('verifica se a página tem um heading h2', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading', { level: 2, name: /Page requested not/i });
  expect(notFound).toBeInTheDocument();
});

test('verifica se a página mostra uma imagem específica ', () => {
  renderWithRouter(<NotFound />);
  const notFoundImage = screen.getByRole('img', { name: /Pikachu crying because the/i });
  expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(notFoundImage).toBeInTheDocument();
});
