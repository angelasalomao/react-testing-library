import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('verifica se a aplicação contem um conjunto fixo de navegação', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(favoriteLink).toBeInTheDocument();
});

test('verifica se redireciona para a página home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('verifica se redireciona para a página about', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: 'About' });
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('verifica se redireciona para a página de pokemons favoritos', () => {
  const { history } = renderWithRouter(<App />);
  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
