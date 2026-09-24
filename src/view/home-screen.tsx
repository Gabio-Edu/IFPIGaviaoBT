import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useHomeViewModel } from "@/viewmodel/use-home-view-model";

export function HomeScreen() {
  // A View consome o estado da ViewModel e cuida somente da apresentação.
  const [state, actions] = useHomeViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>IFPI Gavião</Text>

      {state.carregando && (
        <View style={styles.carregando}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      )}

      {state.erro && <Text style={styles.erro}>{state.erro}</Text>}

      {!state.carregando && !state.erro && (
        <ScrollView>
          {state.categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              activeOpacity={0.7}
              style={styles.card}
              onPress={() => actions.navegarParaCategoria(categoria.id)}
            >
              <Text style={styles.nomeCategoria}>{categoria.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  erro: {
    color: "red",
    padding: 20,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  nomeCategoria: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
