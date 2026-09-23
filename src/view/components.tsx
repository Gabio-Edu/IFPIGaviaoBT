import ICategories from "@/model/entities/Icategories";
import { HomeViewModel } from "@/viewmodel/homeViewModel";
import { Ionicons } from "@expo/vector-icons";
import { ImperativeRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      style={[styles.cardCategoria, { borderColor: props.cat.corBorda }]}
      onPress={() =>
        sendAction({
          action: "push-page",
          contentRequest: [props.router, `/category/${props.cat.id}`],
        })
      }
    >
      {/* Imagem de Capa da Categoria */}
      <Image
        source={props.cat.imagem}
        style={styles.imagemCategoria}
        resizeMode="cover"
      />

      {/* Rodapé do Card com Nome e Seta */}
      <View style={styles.rodapeCard}>
        <Text style={styles.nomeCategoria}>{props.cat.nome}</Text>
        <Ionicons name="arrow-forward" size={20} color={props.cat.corSeta} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
