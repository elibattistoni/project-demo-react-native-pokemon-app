export const initialState = {
  modalIsVisible: false,
  activePokemonId: undefined,
  activePokemonDetails: undefined,
  currentPage: 0,
  pokemonsPerPage: 16,
  pokemons: [],
  pokemonsInPage: [],
};

export function actionReducer(state, action) {
  if (action.type === "STRUCTURE_POKEMON_DATA") {
    //! structure pokemon data
    const data = action.value;

    const pokemonsArray = [];
    let pokemonCounter = 0;

    for (const [idx, pokemon] of data["pokemon_v2_pokemon"].entries()) {
      const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      const pokemonType = pokemon["pokemon_v2_pokemontypes"].map(
        (item) => item["pokemon_v2_type"].name
      );
      const pokemonStats = pokemon["pokemon_v2_pokemonstats"].map(
        (item) => item["pokemon_v2_stat"].name
      );
      const pokemonSpecies = pokemon["pokemon_v2_pokemonspecy"].name;
      const pokemonGen =
        pokemon["pokemon_v2_pokemonspecy"]["pokemon_v2_generation"].name;

      const pokemonItem = {
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
    const firstPokemon = 0;
    const lastPokemon = firstPokemon + state.pokemonsPerPage;

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
    const lastPokemon = state.pokemonsInPage.at(0).pokemonNumber;
    const firstPokemon = lastPokemon - state.pokemonsPerPage;

    return {
      ...state,
      ...{
        pokemonsInPage: state.pokemons.slice(firstPokemon, lastPokemon),
        currentPage: state.currentPage - 1,
      },
    };
  }

  if (action.type === "NEXT_PAGE") {
    //! take the last pokemon of the current page and add 1 (it will be the first pokemon in the next page)
    const firstPokemon = state.pokemonsInPage.at(-1).pokemonNumber + 1;
    const lastPokemon = firstPokemon + state.pokemonsPerPage;

    if (firstPokemon === state.pokemons.length) {
      return state;
    }

    return {
      ...state,
      ...{
        pokemonsInPage: state.pokemons.slice(firstPokemon, lastPokemon),
        currentPage: state.currentPage + 1,
      },
    };
  }

  if (action.type === "OPEN_MODAL_DETAILS") {
    const [pokemonDetails] = state.pokemons.filter(
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
}
