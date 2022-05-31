import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('verifica se é exibido no favorite pokemons found se não tiver favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const noFoundText = screen.getByText('No favorite pokemon found');
  expect(noFoundText).toBeInTheDocument();
});

test('verifica se é exibido todos os cards de pokemons favoritos', () => {
  const pokemonsFav = [
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    },
    {
      id: 143,
      name: 'Snorlax',
      type: 'Normal',
      averageWeight: {
        value: '460.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    },
  ];
  renderWithRouter(<FavoritePokemons pokemons={ pokemonsFav } />);
  const pokemons = screen.getAllByTestId('pokemon-name');
  expect(pokemons).toHaveLength(2);
});
