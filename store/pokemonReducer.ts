import { PokemonState, PokemonAction, Pokemon } from "../models/pokemon";

export const initialState: PokemonState = {
  modalIsVisible: false,
  activePokemonId: undefined,
  activePokemonDetails: undefined,
  currentPage: 0,
  pokemonsPerPage: 16,
  pokemons: [],
  pokemonsInPage: [],
};

export function actionReducer(
  state: PokemonState,
  action: PokemonAction
): PokemonState {
  if (action.type === "STRUCTURE_POKEMON_DATA") {
    const data = action.value;

    const pokemonsArray: Pokemon[] = [];
    let pokemonCounter: number = 0;

    for (const [idx, pokemon] of data["pokemon_v2_pokemon"].entries()) {
      const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      const pokemonType = pokemon["pokemon_v2_pokemontypes"].map(
        (item: any) => item["pokemon_v2_type"].name
      );
      const pokemonStats = pokemon["pokemon_v2_pokemonstats"].map(
        (item: any) => item["pokemon_v2_stat"].name
      );
      const pokemonSpecies = pokemon["pokemon_v2_pokemonspecy"].name;
      const pokemonGen =
        pokemon["pokemon_v2_pokemonspecy"]["pokemon_v2_generation"].name;

      const pokemonItem: Pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        imageUrl: pokemonImg,
        type: pokemonType,
        stats: pokemonStats,
        species: pokemonSpecies,
        generation: pokemonGen,
        pokemonNumber: pokemonCounter++,
      };

      pokemonsArray.push(pokemonItem);
    }
    const firstPokemon: number = 0;
    const lastPokemon: number = firstPokemon + state.pokemonsPerPage;

    return {
      ...state,
      ...{
        pokemons: pokemonsArray,
        pokemonsInPage: pokemonsArray.slice(firstPokemon, lastPokemon),
      },
    };
  }

  if (action.type === "PREVIOUS_PAGE") {
    //! take the first pokemon of the current page and subtract 1 (it will be the last pokemon in the previous page)
    let firstPokemon = 0;
    let lastPokemon = state.pokemonsPerPage;
    let newCurrentPage = 0;
    if (state.pokemonsInPage.length > 0) {
      lastPokemon = state.pokemonsInPage.at(0)!.pokemonNumber;
      firstPokemon = lastPokemon - state.pokemonsPerPage;
      newCurrentPage = state.currentPage - 1;
    }

    return {
      ...state,
      ...{
        pokemonsInPage: state.pokemons.slice(firstPokemon, lastPokemon),
        currentPage: newCurrentPage,
      },
    };
  }

  if (action.type === "NEXT_PAGE") {
    //! take the last pokemon of the current page and add 1 (it will be the first pokemon in the next page)
    let firstPokemon = 0;
    let lastPokemon = state.pokemonsPerPage;
    let newCurrentPage = 0;

    //! deal with last page case
    if (state.pokemonsInPage.length > 0) {
      firstPokemon = state.pokemonsInPage.at(-1)!.pokemonNumber + 1;
      if (firstPokemon !== state.pokemons.length) {
        lastPokemon = firstPokemon + state.pokemonsPerPage;
        newCurrentPage = state.currentPage + 1;
      } else {
        firstPokemon = 0;
      }
    }

    return {
      ...state,
      ...{
        pokemonsInPage: state.pokemons.slice(firstPokemon, lastPokemon),
        currentPage: newCurrentPage,
      },
    };
  }

  if (action.type === "OPEN_MODAL_DETAILS") {
    const [pokemonDetails]: Pokemon[] = state.pokemons.filter(
      (pok) => pok.id === action.value
    );

    return {
      ...state,
      ...{
        modalIsVisible: true,
        activePokemonId: action.value,
        activePokemonDetails: pokemonDetails,
      },
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      ...{
        modalIsVisible: false,
        activePokemonId: undefined,
        activePokemonDetails: undefined,
      },
    };
  }

  return state;
}
