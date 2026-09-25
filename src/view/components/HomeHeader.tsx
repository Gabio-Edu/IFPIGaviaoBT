import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeHeader() {
  return (
    <View style={styles.cabecalhoContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.cabecalhoConteudo}>
          <View style={styles.logoLinha}>
            <Image
              source={require("../../../assets/images/menu/gaviao-logo.png")}
              style={styles.logoGaviao}
              resizeMode="contain"
            />

            <Text style={styles.tituloHeader}>
              IFPI Gavião
            </Text>
          </View>

          <Text style={styles.subtituloTexto}>
            O que você deseja pedir hoje?
          </Text>

          <Text style={styles.subtituloDestaque}>
            Escolha uma categoria:
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalhoContainer: {
    backgroundColor: "#501673",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 28,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  cabecalhoConteudo: {
    alignItems: "center",
    paddingTop: 12,
  },

  logoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  logoGaviao: {
    width: 38,
    height: 38,
    marginRight: 10,
  },

  tituloHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.3,
  },

  subtituloTexto: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.95,
    lineHeight: 22,
  },

  subtituloDestaque: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 22,
  },
});