// ============================================================================
// PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
// Tela de Detalhes do Produto: Apresentação completa e controle de quantidade
// ============================================================================

import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useItemViewModel } from "@/viewModel/useItemViewModel";
import { QuantityControl } from "@/view/components/QuantityControl";
import { BackToMenuButton } from "@/view/components/BackToMenuButton";
import { ProductDetails } from "@/view/components/ProductDetails";

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
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoLinha}>
            {/* Botão de voltar */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.botaoVoltar}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#ffffff"
              />

              <Text style={styles.textoVoltar}>
                Voltar
              </Text>
            </TouchableOpacity>

            {/* Título central */}
            <Text style={styles.tituloHeader}>
              Detalhes do Lanche
            </Text>

            {/* Espaçador para manter o título centralizado */}
            <View style={styles.espacadorHeader} />
          </View>
        </SafeAreaView>
      </View>

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
          <View style={styles.cardFoto}>
            <Image
              source={produto.imagemGrande || produto.imagem}
              style={styles.fotoGrande}
              resizeMode="cover"
            />

            {/* Etiqueta sobreposta no canto inferior da foto */}
            <View style={styles.overlayFoto}>
              <Text style={styles.overlayTexto}>
                {produto.nome}
              </Text>
            </View>
          </View>

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

  cabecalhoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },

  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },

  textoVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },

  tituloHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  espacadorHeader: {
    width: 60,
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