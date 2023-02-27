import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner: React.FC = (): JSX.Element => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#00B0E8" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Spinner;
