# Pokemon App

This App uses React Native (with Expo**), Typescript, GraphQL and the Apollo Client.

To get the information about the Pokemon I used the GraphQL endpoint (https://beta.pokeapi.co/graphql/console/) but for getting the images, I used a Github repo (https://github.com/PokeAPI/sprites).

When starting, the app will fetch the main Pokemon data (i.e. name, species, generation, height, type, ... except the moves because they are the slowest to get). When clicking on a Pokemon, the app will fetch the moves data (for a single Pokemon, it is much faster).

The state is managed with useReducer from the main component PokemonApp (the initial state and the action reducer are defined in "store/pokemonReducer.ts"); all the TypeScript interfaces are defined in "models/pokemon.ts".


## **Installation & run this app
In order to run it with Expo, I use Node 16 (Node < 17 is required). As usual, run "npm install" and then "npm start".

