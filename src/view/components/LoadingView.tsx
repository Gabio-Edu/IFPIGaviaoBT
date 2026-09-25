import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type LoadingViewProps = {
  mensagem: string;
};

export function LoadingView({
  mensagem,
}: LoadingViewProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color="#501673"
      />

      <Text style={styles.loadingTexto}>
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
  },
});