import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { buscarProdutoPorId } from "@/model/produto-data-source";
import type { Produto } from "@/model/produto";

type ItemState = {
  produto: Produto | null;
  carregando: boolean;
  quantidade: number;
};

type ItemActions = {
  formatarPreco: (valor: number) => string;
  incrementarQuantidade: () => void;
  decrementarQuantidade: () => void;
  voltar: () => void;
};

export function useItemViewModel(): readonly [ItemState, ItemActions] {
  const { id: parametroId } = useLocalSearchParams<{
    id?: string | string[];
  }>();
  const id = Array.isArray(parametroId) ? parametroId[0] : parametroId;
  const router = useRouter();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [quantidade, setQuantidade] = useState(1);

  // A ViewModel concentra a consulta assíncrona e mantém o loading consistente.
  const carregarProduto = useCallback(async () => {
    setCarregando(true);

    if (!id) {
      setProduto(null);
      setCarregando(false);
      return;
    }

    try {
      const resultado = await buscarProdutoPorId(id);
      setProduto(resultado ?? null);
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error);
      setProduto(null);
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    void carregarProduto();
  }, [carregarProduto]);

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  function decrementarQuantidade() {
    setQuantidade((atual) => (atual > 1 ? atual - 1 : atual));
  }

  function incrementarQuantidade() {
    setQuantidade((atual) => atual + 1);
  }

  const state: ItemState = { produto, carregando, quantidade };
  const actions: ItemActions = {
    formatarPreco,
    incrementarQuantidade,
    decrementarQuantidade,
    voltar: () => router.back(),
  };

  return [state, actions];
}
