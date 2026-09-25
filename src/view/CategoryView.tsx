import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { useCategoryViewModel } from "@/viewModel/useCategoryViewModel";

import { ProductCard } from "@/view/components/ProductCard";
import { CategoryHeader } from "@/view/components/CategoryHeader";
import { LoadingView } from "@/view/components/LoadingView";

const CategoryView = () => {
  const router = useRouter();

  const { id } =
    useLocalSearchParams<{ id: string }>();

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
        <LoadingView mensagem="Buscando itens no banco..." />
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
                router.push({
                  pathname: "/item/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },

  listaConteudo: {
    padding: 16,
    paddingBottom: 32,
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

export default CategoryView;