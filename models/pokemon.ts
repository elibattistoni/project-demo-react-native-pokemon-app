export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  species: string;
  stats: string[];
  types: string[];
  height: number;
  moves: string[];
}

export interface PokemonQuery {}
