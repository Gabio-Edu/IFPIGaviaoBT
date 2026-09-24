import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type QuantityControlProps = {
  quantidade: number;
  decrementarQuantidade: () => void;
  incrementarQuantidade: () => void;
};

export function QuantityControl({
  quantidade,
  decrementarQuantidade,
  incrementarQuantidade,
}: QuantityControlProps) {
  return (
    <View style={styles.quantidadeLinha}>
      <Text style={styles.quantidadeLabel}>Quantidades:</Text>

      <View style={styles.seletorContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnMenos}
          onPress={decrementarQuantidade}
        >
          <Ionicons name="remove" size={20} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.numeroQuantidade}>{quantidade}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnMais}
          onPress={incrementarQuantidade}
        >
          <Ionicons name="add" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantidadeLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 26,
  },

  quantidadeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  seletorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  btnMenos: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#501673",
    alignItems: "center",
    justifyContent: "center",
  },

  numeroQuantidade: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginHorizontal: 16,
    minWidth: 18,
    textAlign: "center",
  },

  btnMais: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#248232",
    alignItems: "center",
    justifyContent: "center",
  },
});