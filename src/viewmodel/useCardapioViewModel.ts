import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import type { Produto } from "../model/produto";
import { ProdutoDataSource } from "../model/produtoDataSource";

const produtoDataSource = new ProdutoDataSource();

export type CardapioState = {
  produtos: Produto[];
  nomeCategoria: string;
  carregando: boolean;
  erro: string | null;
};

export type CardapioActions = {
  voltar(): void;
  abrirProduto(id: string): void;
};

function normalizarParametro(parametro: string | string[] | undefined): string | undefined {
  return Array.isArray(parametro) ? parametro[0] : parametro;
}

function obterNomeCategoria(categoriaId: string | undefined): string {
  if (categoriaId === "bebidas") return "Bebidas";
  if (categoriaId === "comidas") return "Comidas";
  return "Cardápio";
}

function obterMensagemErro(erro: unknown): string {
  return erro instanceof Error ? erro.message : "Não foi possível carregar os produtos.";
}

export function useCardapioViewModel(): [CardapioState, CardapioActions] {
  const router = useRouter();
  const parametros = useLocalSearchParams<{ id?: string | string[] }>();
  const categoriaId = normalizarParametro(parametros.id);
  const nomeCategoria = obterNomeCategoria(categoriaId);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProdutos(): Promise<void> {
      setCarregando(true);
      setErro(null);

      try {
        const produtosEncontrados = categoriaId
          ? await produtoDataSource.buscarPorCategoria(categoriaId)
          : [];
        setProdutos(produtosEncontrados);
      } catch (erro: unknown) {
        setErro(obterMensagemErro(erro));
      } finally {
        setCarregando(false);
      }
    }

    void carregarProdutos();
  }, [categoriaId]);

  const state: CardapioState = { produtos, nomeCategoria, carregando, erro };
  const actions: CardapioActions = {
    voltar(): void {
      router.back();
    },
    abrirProduto(id: string): void {
      router.push({ pathname: "/item/[id]", params: { id } });
    },
  };

  return [state, actions];
}
