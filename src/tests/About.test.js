import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('verifica se a página contém informações sobre a pokedex', () => {
  render(<About />);
  const pokedex = screen.getByText(/This application simulates a Pokédex, a digital/i);
  expect(pokedex).toBeInTheDocument();
});

test('verifica se a página contém um heading h2', () => {
  render(<About />);
  const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(aboutTitle).toBeInTheDocument();
});

test('verifica se a página contém dois parágrafos', () => {
  render(<About />);
  const p1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
  const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/i);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
});

test('verifica se a página contém a imagem de uma pokedex', () => {
  render(<About />);
  const pokedexImage = screen.getByRole('img', { name: 'Pokédex' });
  expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(pokedexImage).toBeInTheDocument();
});
