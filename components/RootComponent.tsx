import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";

const POKEMONS = gql`
  query MyQuery {
    pokemon_v2_pokemon(distinct_on: id) {
      height
      id
      name
      pokemon_species_id
    }
    pokemon_v2_pokemonsprites(distinct_on: pokemon_id) {
      id
      pokemon_id
      sprites
    }
  }
`;

export default function RootComponent() {
  const [pokemons, setPokemons] = useState([]);
  const { loading, error, data } = useQuery(POKEMONS);

  useEffect(() => {
    if (data) {
      const pokemonsArray = [];

      for (const [idx, pok] of data["pokemon_v2_pokemon"].entries()) {
        const pokemonItem = {
          key: pok.id,
          name: pok.name,
          height: pok.height,
          speciesId: pok["pokemon_species_id"],
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pok.id}.png`,
        };

        pokemonsArray.push(pokemonItem);
      }

      setPokemons(pokemonsArray);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Pokemon App</Text>
      <View style={styles.pokemonsContainer}>
        {loading && <Text style={styles.instructions}>Loading...</Text>}
        {!loading && pokemons && (
          <FlatList
            data={pokemons}
            renderItem={(itemData) => {
              return (
                <View style={styles.pokemonItem}>
                  <Text style={styles.pokemonName}>{itemData.item.name}</Text>
                  <Image
                    source={{ uri: itemData.item.imageUrl }}
                    style={styles.image}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: "rgba(50, 255, 43, 0.3)",
    color: "#E3E3E3FF",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
  },
  pokemonsContainer: {
    flex: 10,
    backgroundColor: "rgba(255, 179, 203, 0.2)",
  },
  instructions: {
    color: "#E3E3E3FF",
    textAlign: "center",
    fontSize: 20,
  },
  pokemonItem: {
    backgroundColor: "rgba(46, 199, 255, 0.56)",
  },
  pokemonName: {
    color: "#E3E3E3FF",
  },
  image: {
    width: 20,
    height: 20,
  },
});
