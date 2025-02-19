import { Button, FlatList, Text, View, StyleSheet } from "react-native";

const ListaRegistros = ({ registros, setTelaAtual }) => (
  <View style={estilos.container}>
    <Text style={estilos.titulo}>Registros Salvos</Text>
    <FlatList
      data={registros}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={estilos.item}>
          <Text>Quantidade: {item.qtd}</Text>
          <Text>Produto: {item.produto}</Text>
          <Text>Valor: {item.valor}</Text>
        </View>
      )}
    />
    <Button title="Voltar" onPress={() => setTelaAtual("produto")} />
  </View>
);

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ListaRegistros;
