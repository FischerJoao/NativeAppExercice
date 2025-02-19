import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";
import Produto from "./produto";
import ListaRegistros from "./ListaRegistros";

export default function Storage() {
  const [telaAtual, setTelaAtual] = useState("produto");
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const carregarRegistros = async () => {
      const registrosExistentes = await AsyncStorage.getItem("registros");
      if (registrosExistentes) {
        const parsedRegistros = JSON.parse(registrosExistentes);
        console.log("Registros carregados:", parsedRegistros);
        setRegistros(parsedRegistros);
      }
    };
    carregarRegistros();
  }, [telaAtual]);

  const salvarNoAsyncStorage = async (qtd, produto, valor) => {
    try {
      const registro = {
        qtd: qtd,
        produto: produto,
        valor: valor,
      };
      const registrosExistentes = await AsyncStorage.getItem("registros");
      const registros = registrosExistentes
        ? JSON.parse(registrosExistentes)
        : [];
      registros.push(registro);

      await AsyncStorage.setItem("registros", JSON.stringify(registros));
      Alert.alert("Sucesso", "Registro salvo com sucesso");
    } catch (error) {
      console.error("erro ao salvar registro", error);
      Alert.alert("Erro", "Erro ao salvar registro");
    }
  };

  return (
    <View>
      {telaAtual === "produto" ? (
        <Produto
          onSalvardados={salvarNoAsyncStorage}
          setTelaAtual={setTelaAtual}
        />
      ) : (
        <ListaRegistros registros={registros} setTelaAtual={setTelaAtual} />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  // Adicione estilos aqui, se necessário
});
