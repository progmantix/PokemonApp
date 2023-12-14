import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../app/colors";

const styles = StyleSheet.create({
  centererView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backGround,
  },
});

const LoadingScreen = () => {
  return (
    <View style={{ ...styles.centererView }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
