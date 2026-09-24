import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useCategoryViewModel } from "../../viewModel/useCategoryViewModel";
import { ProductCard } from "@/view/components/ProductCard";
import { CategoryHeader } from "@/view/components/CategoryHeader";

export default function CategoryScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    carregando,
    produtos,
    nomeCategoria,
    formatarPreco,
  } = useCategoryViewModel(id);

  return (
    <View style={styles.tela}>
      <CategoryHeader
        titulo={nomeCategoria}
        onVoltar={() => router.back()}
      />

      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#501673"
          />

          <Text style={styles.loadingTexto}>
            Buscando itens no banco...
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>
                Nenhum item encontrado nesta categoria.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              produto={item}
              formatarPreco={formatarPreco}
              onPress={() =>
                router.push(`/item/${item.id}` as any)
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },

  listaConteudo: {
    padding: 16,
    paddingBottom: 32,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
  },

  vazioContainer: {
    paddingTop: 60,
    alignItems: "center",
  },

  vazioTexto: {
    fontSize: 15,
    color: "#8c959f",
  },
});