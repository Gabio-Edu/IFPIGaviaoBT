import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type CategoryHeaderProps = {
  titulo: string;
  onVoltar: () => void;
};

export function CategoryHeader({
  titulo,
  onVoltar,
}: CategoryHeaderProps) {
  return (
    <View style={styles.cabecalhoContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.cabecalhoLinha}>
          {/* Botão de Retorno < Início */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.botaoVoltar}
            onPress={onVoltar}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="#ffffff"
            />

            <Text style={styles.textoVoltar}>
              Início
            </Text>
          </TouchableOpacity>

          {/* Nome Centralizado da Categoria */}
          <Text style={styles.tituloHeader}>
            {titulo}
          </Text>

          {/* Espaçador invisível para balancear o cabeçalho */}
          <View style={styles.espacadorHeader} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalhoContainer: {
    backgroundColor: "#501673",
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  cabecalhoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },

  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },

  textoVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },

  tituloHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  espacadorHeader: {
    width: 60,
  },
});