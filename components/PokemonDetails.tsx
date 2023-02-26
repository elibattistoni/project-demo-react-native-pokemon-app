import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { InfoElementProps, PokemonDetailsProps } from "../models/pokemon";

const GET_POKEMON_MOVES = gql`
  query MyQuery($pokemonId: Int!) {
    pokemon_v2_pokemonmove(
      where: { pokemon_id: { _eq: $pokemonId } }
      distinct_on: move_id
    ) {
      pokemon_id
      move_id
      pokemon_v2_move {
        name
      }
    }
  }
`;

const InfoElement: React.FC<InfoElementProps> = ({
  title,
  description,
}): JSX.Element => {
  return (
    <View style={styles.textItem}>
      <Text style={styles.textItemTitle}>{title}</Text>
      <Text style={styles.textItemInfo}>{description}</Text>
    </View>
  );
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  id,
  isVisible,
  details,
  onCloseModal,
}): JSX.Element => {
  const [moves, setMoves] = useState<string[]>([]);

  const { loading, error, data } = useQuery(GET_POKEMON_MOVES, {
    variables: { pokemonId: id },
  });

  useEffect(() => {
    if (data) {
      const activeMoves: string[] = data["pokemon_v2_pokemonmove"].map(
        (item: any) => item["pokemon_v2_move"].name
      );
      setMoves(activeMoves);
    }
  }, [data]);

  function closeModalHandler() {
    onCloseModal();
  }

  let modalContent: JSX.Element = <></>;
  if (loading) {
    modalContent = <Spinner />;
  } else {
    if (moves) {
      modalContent = (
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{details.name.toUpperCase()}</Text>
          <Image source={{ uri: details.imageUrl }} style={styles.image} />
          <ScrollView alwaysBounceVertical={false}>
            <View style={styles.details}>
              <InfoElement
                title="TYPE:"
                description={details.type.join(", ")}
              />
              <InfoElement title="SPECIES:" description={details.species} />
              <InfoElement title="HEIGHT:" description={details.height} />
              <InfoElement
                title="STATS:"
                description={details.stats.join(", ")}
              />
              <InfoElement
                title="GENERATION:"
                description={details.generation}
              />
              <InfoElement title="MOVES:" description={moves.join(", ")} />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable onPress={closeModalHandler} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={closeModalHandler}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.modal}>{modalContent}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#333333",
    flex: 1,
  },
  mainContainer: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#00B0E8",
    marginBottom: 10,
  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  details: {
    flex: 1,
    borderTopColor: "white",
    borderTopWidth: 0.5,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  textItem: {
    marginBottom: 30,
  },
  textItemTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  textItemInfo: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderTopColor: "white",
    borderTopWidth: 0.5,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(79, 195, 232, 0.85)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default PokemonDetails;
