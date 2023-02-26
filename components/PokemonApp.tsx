import { StatusBar } from "expo-status-bar";
import { useEffect, useReducer } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { initialState, actionReducer } from "../store/pokemonReducer";
import PokemonItem from "./PokemonItem";
import PokemonDetails from "./PokemonDetails";
import Spinner from "./Spinner";

const GET_POKEMONS = gql`
  query MyQuery {
    pokemon_v2_pokemon(distinct_on: id) {
      id
      name
      height
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        name
        pokemon_v2_generation {
          name
        }
      }
    }
  }
`;

export default function PokemonApp() {
  const [state, dispatchAction] = useReducer(actionReducer, initialState);
  const {
    modalIsVisible,
    activePokemonId,
    activePokemonDetails,
    currentPage,
    pokemonsInPage,
  } = state;

  //! query pokemons from GraphQL
  const { loading, error, data } = useQuery(GET_POKEMONS);
  useEffect(() => {
    if (data) {
      dispatchAction({ type: "STRUCTURE_POKEMON_DATA", value: data });
    }
  }, [data]);

  //! show modal
  function showModalHandler(pokemonId) {
    dispatchAction({ type: "OPEN_MODAL_DETAILS", value: pokemonId });
  }
  //! close modal
  function closeModalHandler() {
    dispatchAction({ type: "CLOSE_MODAL" });
  }

  //! define the content of the list of pokemons
  let mainContent = null;
  if (loading) {
    mainContent = <Spinner />;
  } else {
    if (pokemonsInPage) {
      mainContent = (
        <FlatList
          data={pokemonsInPage}
          renderItem={(itemData) => (
            <PokemonItem
              id={itemData.item.id}
              imageUrl={itemData.item.imageUrl}
              name={itemData.item.name}
              onShow={showModalHandler}
            />
          )}
          keyExtractor={(item, _) => {
            return item.id;
          }}
        />
      );
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {modalIsVisible && (
          <PokemonDetails
            id={activePokemonId}
            isVisible={modalIsVisible}
            details={activePokemonDetails}
            onCloseModal={closeModalHandler}
          />
        )}
        <Text style={styles.title}>Pokemon App</Text>
        <View style={styles.pokemonsContainer}>{mainContent}</View>
        <View style={styles.footer}>
          <Pressable
            style={styles.pageBtn}
            disabled={currentPage === 0 ? true : false}
            onPress={() => {
              dispatchAction({ type: "PREVIOUS_PAGE" });
            }}
          >
            <Text style={styles.pageText}>{"<"}</Text>
          </Pressable>
          <Text style={styles.currPage}>{currentPage + 1}</Text>
          <Pressable
            style={styles.pageBtn}
            disabled={false}
            onPress={() => {
              dispatchAction({ type: "NEXT_PAGE" });
            }}
          >
            <Text style={styles.pageText}>{">"}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#333333",
  },
  title: {
    backgroundColor: "#00B0E8",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
  },
  pokemonsContainer: {
    flex: 10,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  pageBtn: {
    flex: 1,
    backgroundColor: "#00B0E8",
    paddingVertical: 12,
    borderRadius: 100,
  },
  currPage: {
    flex: 5,
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  pageText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
});
