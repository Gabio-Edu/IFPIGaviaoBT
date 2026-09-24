// ============================================================================
// PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
// Tela Inicial: Apresentação das Categorias (Comidas e Bebidas)
// ============================================================================

import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

import { useHomeViewModel } from "../viewModel/useHomeViewModel";

import { CategoryCard } from "@/view/components/CategoryCard";
import { HomeHeader } from "@/view/components/HomeHeader";
import { LoadingView } from "@/view/components/LoadingView";

export default function HomeScreen() {
  const router = useRouter();

  const {
    carregando,
    categorias,
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
        ) : (
          <View style={styles.gridCategorias}>
            {categorias.map((categoria) => (
              <CategoryCard
                key={categoria.id}
                categoria={categoria}
                onPress={() =>
                  router.push(
                    `/category/${categoria.id}` as any
                  )
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

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
});