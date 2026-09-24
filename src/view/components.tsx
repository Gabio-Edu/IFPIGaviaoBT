import ICategories from "@/model/entities/Icategories";
import { HomeViewModel } from "@/viewmodel/homeViewModel";
import { Ionicons } from "@expo/vector-icons";
import { ImperativeRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
///
///COMPONENTE:ITEM
type ItemProps = {
  cat: ICategories;
  router: ImperativeRouter;
};

export const Item = (props: ItemProps) => {
  const sendAction = HomeViewModel.sendAction;

  return (
    <TouchableOpacity
      key={props.cat.id}
      activeOpacity={0.88}
      style={[ItemStyles.cardCategoria, { borderColor: props.cat.corBorda }]}
      onPress={() =>
        sendAction({
          action: "push-page",
          contentRequest: {
            router: props.router,
            contentId: `/category/${props.cat.id}`,
          },
        })
      }
    >
      {/* Imagem de Capa da Categoria */}
      <Image
        source={props.cat.imagem}
        style={ItemStyles.imagemCategoria}
        resizeMode="cover"
      />

      {/* Rodapé do Card com Nome e Seta */}
      <View style={ItemStyles.rodapeCard}>
        <Text style={ItemStyles.nomeCategoria}>{props.cat.nome}</Text>
        <Ionicons name="arrow-forward" size={20} color={props.cat.corSeta} />
      </View>
    </TouchableOpacity>
  );
};

const ItemStyles = StyleSheet.create({
  cardCategoria: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imagemCategoria: {
    width: "100%",
    height: 210,
  },
  rodapeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  nomeCategoria: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});

///COMPONENTE:CABECALHO
export const Cabecalho = () => {
  return (
    <View style={CabecalhoStyles.cabecalhoContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={CabecalhoStyles.cabecalhoConteudo}>
          {/* Linha com Ícone do Gavião e Nome da Lanchonete */}
          <View style={CabecalhoStyles.logoLinha}>
            <Image
              source={require("../../assets/images/menu/gaviao-logo.png")}
              style={CabecalhoStyles.logoGaviao}
              resizeMode="contain"
            />
            <Text style={CabecalhoStyles.tituloHeader}>IFPI Gavião</Text>
          </View>

          {/* Mensagem de Boas-Vindas */}
          <Text style={CabecalhoStyles.subtituloTexto}>
            O que você deseja pedir hoje?
          </Text>
          <Text style={CabecalhoStyles.subtituloDestaque}>
            Escolha uma categoria:
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
const CabecalhoStyles = StyleSheet.create({
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

export const TelaCarregamento = () => {
  return (
    <View style={loudingStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#501673" />
      <Text style={loudingStyles.loadingTexto}>Consultando cardápio...</Text>
    </View>
  );
};
const loudingStyles = StyleSheet.create({
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
