import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Spinner() {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#00B0E8" />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
});
