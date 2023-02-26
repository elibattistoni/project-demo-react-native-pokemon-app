import { useCallback } from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { PokemonItemProps } from "../models/pokemon";

const PokemonItem: React.FC<PokemonItemProps> = ({
  id,
  name,
  imageUrl,
  onShow,
}): JSX.Element => {
  const clickHandler = useCallback(() => {
    onShow(id);
  }, [id]);

  return (
    <Pressable onPress={clickHandler}>
      <View style={styles.pokemonItem}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.pokemonName}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    backgroundColor: "rgba(79, 195, 232, 0.85)",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  pokemonName: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default PokemonItem;
