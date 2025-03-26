import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Produto from "./produto";
import ListaRegistros from "./ListaRegistros";

export default function Storage() {
  const [telaAtual, setTelaAtual] = useState("produto");
  const [registros, setRegistros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const apagarTodosRegistros = async () => {
    await AsyncStorage.removeItem("registros");
    setRegistros([]);
    Alert.alert("Sucesso", "Todos os dados foram removidos!");
    setTelaAtual("produto");
  };

  return (
    <View style={estilos.container}>
      {telaAtual === "produto" ? (
        <Produto
          onSalvardados={salvarNoAsyncStorage}
          setTelaAtual={setTelaAtual}
        />
      ) : (
        <ListaRegistros registros={registros} setTelaAtual={setTelaAtual} />
      )}
      <TouchableOpacity style={estilos.botao} onPress={() => setModalVisible(true)}>
        <Text style={estilos.textoBotao}>Apagar Todos os Registros</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalView}>
            <Text style={estilos.modalText}>Você tem certeza que deseja apagar todos os registros?</Text>
            <View style={estilos.modalButtons}>
              <Button title="Não" onPress={() => setModalVisible(false)} />
              <Button title="Sim" onPress={() => { setModalVisible(false); apagarTodosRegistros(); }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  botao: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});