import { Text, StyleSheet, TouchableOpacity } from "react-native";

type BackToMenuButtonProps = {
  onPress: () => void;
};

export function BackToMenuButton({
  onPress,
}: BackToMenuButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.btnVoltarCardapio}
      onPress={onPress}
    >
      <Text style={styles.textoBtnVoltar}>Voltar ao Cardápio</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnVoltarCardapio: {
    backgroundColor: "#501673",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  textoBtnVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});