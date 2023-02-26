export const initialState = {
  pokemons: [],
  modalIsVisible: false,
  activePokemonId: null,
  activePokemonDetails: null,
};

export function actionReducer(state, action) {
  if (action.type === "STRUCTURE_POKEMON_DATA") {
    const data = action.value;

    const pokemonsArray = [];

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
      };

      pokemonsArray.push(pokemonItem);
    }

    return { ...state, ...{ pokemons: pokemonsArray } };
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
        activePokemonId: null,
        activePokemonDetails: null,
      },
    };
  }
}
