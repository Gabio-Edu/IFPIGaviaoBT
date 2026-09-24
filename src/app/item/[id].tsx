import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { useItemViewModel } from "@/viewModel/useItemViewModel";
import { ItemHeader } from "@/view/components/ItemHeader";
import { ProductImage } from "@/view/components/ProductImage";
import { ProductDetails } from "@/view/components/ProductDetails";
import { QuantityControl } from "@/view/components/QuantityControl";
import { BackToMenuButton } from "@/view/components/BackToMenuButton";
import { LoadingView } from "@/view/components/LoadingView";

export default function ItemDetailScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    carregando,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  } = useItemViewModel(id);

  return (
    <View style={styles.tela}>
      <ItemHeader onVoltar={() => router.back()} />

      {carregando ? (
        <LoadingView mensagem="Carregando detalhes do item..." />
      ) : produto ? (
        <ScrollView
          contentContainerStyle={styles.conteudoScroll}
          showsVerticalScrollIndicator={false}
        >
          <ProductImage
            imagem={produto.imagemGrande || produto.imagem}
            nome={produto.nome}
          />

          <ProductDetails
            nome={produto.nome}
            preco={formatarPreco(produto.preco)}
            categoriaNome={produto.categoriaNome}
            descricao={produto.descricao}
            proteinas={produto.proteinas}
            carboidratos={produto.carboidratos}
            gorduras={produto.gorduras}
          >
            <QuantityControl
              quantidade={quantidade}
              decrementarQuantidade={decrementarQuantidade}
              incrementarQuantidade={incrementarQuantidade}
            />

            <BackToMenuButton
              onPress={() => router.back()}
            />
          </ProductDetails>
        </ScrollView>
      ) : (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>
            Item não encontrado.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  conteudoScroll: {
    paddingBottom: 40,
  },

  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },

  erroTexto: {
    fontSize: 16,
    color: "#dc3545",
  },
});