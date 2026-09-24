// ============================================================================
// PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
// Tela de Detalhes do Produto: Apresentação completa e controle de quantidade
// ============================================================================

import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useItemViewModel } from "@/viewModel/useItemViewModel";
import { QuantityControl } from "@/view/components/QuantityControl";
import { BackToMenuButton } from "@/view/components/BackToMenuButton";
import { ProductDetails } from "@/view/components/ProductDetails";
import { ItemHeader } from "@/view/components/ItemHeader";
import { ProductImage } from "@/view/components/ProductImage";

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
      {/* CABEÇALHO ROXO COM BOTÃO < VOLTAR */}
      <ItemHeader onVoltar={() => router.back()} />

      {/* CONTEÚDO PRINCIPAL COM ROLAGEM */}
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#501673"
          />

          <Text style={styles.loadingTexto}>
            Carregando detalhes do item...
          </Text>
        </View>
      ) : produto ? (
        <ScrollView
          contentContainerStyle={styles.conteudoScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* FOTO GRANDE DO PRODUTO */}
          <ProductImage
            imagem={produto.imagemGrande || produto.imagem}
            nome={produto.nome}
          />

          {/* DETALHES DO PRODUTO */}
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

            <BackToMenuButton onPress={() => router.back()} />
          </ProductDetails>

          {/* BOTÃO VOLTAR AO CARDÁPIO */}
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

// Estilos que continuam pertencendo à tela
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  cabecalhoContainer: {
    backgroundColor: "#501673",
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  conteudoScroll: {
    paddingBottom: 40,
  },
  cardFoto: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },

  fotoGrande: {
    width: "100%",
    height: 240,
  },

  overlayFoto: {
    position: "absolute",
    bottom: 10,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  overlayTexto: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },

  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
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