import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

import { useHomeViewModel } from "@/viewmodel/useHomeViewModel";

import { CategoryCard } from "@/view/components/CategoryCard";
import { HomeHeader } from "@/view/components/HomeHeader";
import { LoadingView } from "@/view/components/LoadingView";

const HomeView = () => {
  const router = useRouter();

  const {
    carregando,
    categorias,
    erro,
  } = useHomeViewModel();

  return (
    <View style={styles.tela}>
      <HomeHeader />

      <ScrollView
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        {carregando ? (
          <LoadingView mensagem="Consultando cardápio..." />
        ) : erro ? (
          <View style={styles.erroContainer}>
            <Text style={styles.erroTexto}>{erro}</Text>
          </View>
        ) : (
          <View style={styles.gridCategorias}>
            {categorias.map((categoria) => (
              <CategoryCard
                key={categoria.id}
                categoria={categoria}
                onPress={() =>
                  router.push({
                    pathname: "/category/[id]",
                    params: {
                      id: categoria.id,
                    },
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  conteudoScroll: {
    paddingVertical: 28,
    paddingHorizontal: 16,
    flexGrow: 1,
  },

  gridCategorias: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
  },

  erroContainer: {
    paddingTop: 60,
    alignItems: "center",
  },

  erroTexto: {
    fontSize: 15,
    color: "#dc3545",
    textAlign: "center",
  },
});

export default HomeView;