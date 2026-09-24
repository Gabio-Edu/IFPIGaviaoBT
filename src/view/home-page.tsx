// ============================================================================
// PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
// Tela Inicial: Apresentação das Categorias (Comidas e Bebidas)
// ============================================================================

import { HomeViewModel } from "@/viewmodel/home-view-model";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { Cabecalho, Item, TelaCarregamento } from "./components";

export default function HomeScreen() {
  const sendAction = HomeViewModel.sendAction;
  const router = useRouter();

  // Estados gerenciados diretamente na View (Sem ViewModel)
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    // Busca direta do banco simulado com delay assíncrono
    sendAction({
      action: "get-data",
      contentRequest: {
        router: router,
        state: setCarregando,
        localMemoState: setCategorias,
      },
    });
  }, []);

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO COM BORDAS ARREDONDADAS */}
      <View style={styles.cabecalhoContainer}>
        <Cabecalho />
      </View>

      {/* ÁREA DE CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        {carregando ? (
          <TelaCarregamento />
        ) : (
          <View style={styles.gridCategorias}>
            {categorias.map((cat) => (
              <Item key={cat.id} cat={cat} router={router} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Estilos gigantescos concentrados no final do arquivo da tela (Típico do Big Tripe)
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
