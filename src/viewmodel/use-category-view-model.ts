import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { buscarProdutosPorCategoria } from "@/model/produto-data-source";
import type { Produto } from "@/model/produto";

type CategoryState = {
  id: string | undefined;
  nomeCategoria: string;
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
};

type CategoryActions = {
  formatarPreco: (valor: number) => string;
  voltar: () => void;
  navegarParaItem: (produtoId: string) => void;
};

export function useCategoryViewModel(): readonly [
  CategoryState,
  CategoryActions,
] {
  const { id: parametroId } = useLocalSearchParams<{
    id?: string | string[];
  }>();
  const id = Array.isArray(parametroId) ? parametroId[0] : parametroId;
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // A ViewModel lê o parâmetro da rota e controla a consulta e seus estados.
  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    if (!id) {
      setProdutos([]);
      setErro("Identificador da categoria ausente.");
      setCarregando(false);
      return;
    }

    try {
      const resultado = await buscarProdutosPorCategoria(id);
      setProdutos(resultado);
    } catch (error) {
      console.error("Erro ao buscar produtos da categoria:", error);
      setProdutos([]);
      setErro("Não foi possível carregar os produtos da categoria.");
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    void carregarProdutos();
  }, [carregarProdutos]);

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  const state: CategoryState = {
    id,
    nomeCategoria:
      id === "bebidas" ? "Bebidas" : id === "comidas" ? "Comidas" : "Cardápio",
    produtos,
    carregando,
    erro,
  };

  // A navegação também fica na ViewModel; a View dispara somente estas ações.
  const actions: CategoryActions = {
    formatarPreco,
    voltar: () => router.back(),
    navegarParaItem: (produtoId) => {
      router.push({ pathname: "/item/[id]", params: { id: produtoId } });
    },
  };

  return [state, actions];
}
