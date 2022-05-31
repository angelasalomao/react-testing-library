import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemonInfo = pokemons[1];

test('verifica se é renderizado um card com as informações de um pokemon', () => {
  const { averageWeight, image, name, type } = pokemonInfo;
  const { measurementUnit, value } = averageWeight;

  renderWithRouter(<Pokemon pokemon={ pokemonInfo } />);

  const pokemonName = screen.getByText(name);
  expect(pokemonName).toBeInTheDocument();
  const pokemonType = screen.getByText(type);
  expect(pokemonType).toBeInTheDocument();
  const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
  expect(pokemonWeight).toBeInTheDocument();
  const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
  expect(pokemonImage.src).toBe(image);
  expect(pokemonImage).toBeInTheDocument();
});

test('verifica se o card contém um link para exibir os detalhes do pokemon', () => {
  const { id } = pokemonInfo;
  renderWithRouter(<Pokemon pokemon={ pokemonInfo } />);
  const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
  expect(pokemonDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  expect(pokemonDetailsLink).toBeInTheDocument();
});

test('verifica se ao clicar em "more details" é exibido os detalhes do pokemon', () => {
  renderWithRouter(<Pokemon pokemon={ pokemonInfo } />);
  const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
  userEvent.click(pokemonDetailsLink);
  expect(pokemonDetailsLink).toBeInTheDocument();
});

test('verifica se a url mostra "pokemon/id" quando exibe os detalhes do pokemon', () => {
  const { id } = pokemonInfo;
  renderWithRouter(<Pokemon pokemon={ pokemonInfo } />);
  const linkDetails = screen.getByRole('link', `/pokemons/${id}`);
  expect(linkDetails).toBeInTheDocument();
});

test('verifica se existe o icone de estrela nos pokemons favoritos', () => {
  const { name } = pokemonInfo;
  renderWithRouter(<Pokemon pokemon={ pokemonInfo } isFavorite />);
  const starImage = screen.getByRole('img', { name: `${name} is marked as favorite` });
  expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  expect(starImage).toBeInTheDocument();
});
