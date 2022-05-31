import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

test('verifica se a página contém um texto com o nome do pokemon', () => {
  const { name, id, summary } = pokemons[0];
  const isPokemonFavoriteById = {
    [id]: true,
  };
  const checked = false;
  const onUpdateFavoritePokemons = jest.fn(() => !checked);
  renderWithRouter(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
  />);

  const pokemonName = screen.getByText(`${name} Details`);
  expect(pokemonName).toBeInTheDocument();

  const pokemonDetailsLink = screen.queryByRole('link', { name: 'More details' });
  expect(pokemonDetailsLink).not.toBeInTheDocument();

  const summaryTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
  expect(summaryTitle).toBeInTheDocument();

  const paragraphSummary = screen.getByText(summary);
  expect(paragraphSummary).toBeInTheDocument();
});

test('verifica se existe os mapas com as localizações do pokemon', () => {
  const { name, id, foundAt } = pokemons[0];
  const isPokemonFavoriteById = {
    [id]: true,
  };
  const checked = false;
  const onUpdateFavoritePokemons = jest.fn(() => !checked);
  renderWithRouter(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
  />);

  const locationTitle = screen.getByRole('heading',
    { level: 2, name: `Game Locations of ${name}` });
  expect(locationTitle).toBeInTheDocument();
  const images = screen.getAllByRole('img', { name: `${name} location` });
  images.forEach((img, index) => {
    const src = foundAt[index].map;
    expect(img).toHaveAttribute('src', src);
    expect(img).toBeInTheDocument();
  });
});

test('verifica se o pokemon pode ser favoritado na página de detalhes', async () => {
  const { id } = pokemons[0];
  const isPokemonFavoriteById = {
    [id]: true,
  };
  let isFavorite = false;
  const onUpdateFavoritePokemons = jest.fn((_, isChecked) => { isFavorite = isChecked; });
  const { rerender } = renderWithRouter(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
    isFavorite={ isFavorite }
  />);

  const checkboxBtn = screen.getByRole('checkbox');
  expect(checkboxBtn).toBeInTheDocument();
  const checkboxText = screen.getByLabelText('Pokémon favoritado?');
  expect(checkboxText).toBeInTheDocument();

  userEvent.click(checkboxBtn);
  await waitFor(() => expect(checkboxBtn.checked).toBeTruthy());

  /* Utilizado como referencia a função rerender da documentação:
  https://testing-library.com/docs/react-testing-library/api#rerender */
  rerender(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
    isFavorite={ isFavorite }
  />);

  userEvent.click(checkboxBtn);
  await waitFor(() => expect(checkboxBtn.checked).toBeFalsy());
});
