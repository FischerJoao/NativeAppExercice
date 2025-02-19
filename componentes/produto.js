import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function Produto({ onSalvardados, setTelaAtual }) {
  const [qtd, setQTD] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");

  const handleSalvar = () => {
    if (qtd && produto && valor) {
      // Envia os dados para o componente pai usando a função recebida via props
      onSalvardados(qtd, produto, valor);
      setQTD(""); // Limpa o campo de Quantidade
      setProduto(""); // Limpa o campo Produto
      setValor(""); // Limpa o campo valor
    } else {
      Alert.alert("Erro", "Por Favor, preencha todos os campos.");
    }
  };

  const limparCampos = () => {
    setQTD("");
    setProduto("");
    setValor("");
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.inputRow}>
        <Text style={estilos.label}>Quantidade:</Text>
        <TextInput
          value={qtd}
          onChangeText={setQTD}
          style={[estilos.input, { width: "25%" }]}
          maxLength={6}
        />
      </View>
      <View style={estilos.inputRow}>
        <Text style={estilos.label}>Produto:</Text>
        <TextInput
          value={produto}
          onChangeText={setProduto}
          style={estilos.input}
          placeholder="Nome do Produto"
          maxLength={20}
        />
      </View>
      <View style={estilos.inputRow}>
        <Text style={estilos.label}>Valor:</Text>
        <TextInputMask
          type={"money"} // Tipo de máscara para moeda
          value={valor}
          onChangeText={setValor}
          style={estilos.input}
          placeholder="Valor do Produto"
          maxLength={10}
          keyboardType="numeric"
        />
      </View>
      <Text style={estilos.label}>Quantidade: {qtd}</Text>
      <Text style={estilos.label}>Produto: {produto}</Text>
      <Text style={estilos.label}>Valor: {valor}</Text>
      <View style={estilos.inputRow}>
        <View style={[estilos.botao, { margin: 10 }]}>
          <Button title="Limpar" onPress={limparCampos} />
        </View>
        <View style={estilos.botao}>
          <Button title="Salvar" onPress={handleSalvar} />
        </View>
        <View style={[estilos.botao, { margin: 10 }]}>
          <Button
            title="Ver Registros Salvos"
            onPress={() => setTelaAtual("ListaRegistros")}
          />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 5,
    width: "30%",
  },
  botao: {
    marginTop: 10,
  },
  cabecalho: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
});
