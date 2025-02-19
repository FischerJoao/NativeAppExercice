import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "./componentes/AsyncStorage";

export default function App() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.cabecalho}>Armazenamento Local</Text>
      <AsyncStorage />
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cabecalho: {
    marginTop: 100,
    fontSize: 20,
    fontStyle: "italic",
  },
});
