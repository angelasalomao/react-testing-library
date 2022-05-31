import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('verifica se a página contém um heading h2', () => {
  const isPokemonFavoriteById = {
    25: true,
  };
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const pokedexTitle = screen.getByRole('heading', {
    level: 2, name: /Encountered pokémons/i });
  expect(pokedexTitle).toBeInTheDocument();
});

test('verifica se é exibido o próximo pokemon quando o botão próximo é clicado', () => {
  const isPokemonFavoriteById = {
    25: true,
  };

  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(btnNext).toBeInTheDocument();

  pokemons.forEach((pokemon, index) => {
    const currentPokemonName = screen.getByText(pokemon.name);
    expect(currentPokemonName).toBeInTheDocument();

    if (pokemons[pokemons.length - 1] !== pokemon) {
      userEvent.click(btnNext);
      const nextPokemonName = screen.getByText(pokemons[index + 1].name);
      expect(nextPokemonName).toBeInTheDocument();
    }
  });
});

test('verifica se é mostrado apenas um pokemon por vez', () => {
  const isPokemonFavoriteById = {
    25: true,
  };
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const pokemon = screen.getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
});

test('verifica se existe um botão de filtro para cada tipo de pokemon', () => {
  const isPokemonFavoriteById = {
    25: true,
  };
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const btnAll = screen.getByRole('button', { name: 'All' });
  expect(btnAll).toBeInTheDocument();
  const btnEletric = screen.getByRole('button', { name: 'Electric' });
  expect(btnEletric).toBeInTheDocument();
  const btnFire = screen.getByRole('button', { name: 'Fire' });
  expect(btnFire).toBeInTheDocument();
  const btnBug = screen.getByRole('button', { name: 'Bug' });
  expect(btnBug).toBeInTheDocument();
  const btnPoison = screen.getByRole('button', { name: 'Poison' });
  expect(btnPoison).toBeInTheDocument();
  const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
  expect(btnPsychic).toBeInTheDocument();
  const btnNormal = screen.getByRole('button', { name: 'Normal' });
  expect(btnNormal).toBeInTheDocument();
  const btnDragon = screen.getByRole('button', { name: 'Dragon' });
  expect(btnDragon).toBeInTheDocument();
});

test('verifica se a página contém um botão para resetar o filtro', () => {
  const isPokemonFavoriteById = {
    25: true,
  };
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const btnAll = screen.getByRole('button', { name: 'All' });
  expect(btnAll).toBeInTheDocument();

  const buttons = screen.getAllByTestId('pokemon-type-button');
  buttons.forEach((button) => {
    userEvent.click(button);
    userEvent.click(btnAll);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
