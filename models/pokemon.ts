export interface Pokemon {
  id: number;
  name: string;
  height: number;
  imageUrl: string;
  species: string;
  stats: string[];
  type: string[];
  generation: string;
  pokemonNumber: number;
}

export interface PokemonState {
  modalIsVisible: boolean;
  activePokemonId: number | undefined;
  activePokemonDetails: Pokemon | undefined;
  currentPage: number;
  pokemonsPerPage: number;
  pokemons: Pokemon[];
  pokemonsInPage: Pokemon[];
}

export interface PokemonAction {
  type: string;
  value?: any;
}

export interface PokemonItemProps {
  id: number;
  name: string;
  imageUrl: string;
  onShow: (id: number) => void;
}

export interface InfoElementProps {
  title: string;
  description: string | number;
}

export interface PokemonDetailsProps {
  id: number;
  isVisible: boolean;
  details: Pokemon;
  onCloseModal: () => void;
}

export interface FooterProps {
  currentPage: number;
  dispatchAction: React.Dispatch<PokemonAction>;
}
