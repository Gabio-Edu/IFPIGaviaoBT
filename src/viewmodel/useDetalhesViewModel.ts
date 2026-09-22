import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import type { Produto } from "../model/produto";
import { ProdutoDataSource } from "../model/produtoDataSource";

const produtoDataSource = new ProdutoDataSource();

export type DetalhesState = {
  produto: Produto | undefined;
  quantidade: number;
  carregando: boolean;
  erro: string | null;
};

export type DetalhesActions = {
  incrementarQuantidade(): void;
  decrementarQuantidade(): void;
  voltar(): void;
};

function normalizarParametro(parametro: string | string[] | undefined): string | undefined {
  return Array.isArray(parametro) ? parametro[0] : parametro;
}

function obterMensagemErro(erro: unknown): string {
  return erro instanceof Error ? erro.message : "Não foi possível carregar o produto.";
}

export function useDetalhesViewModel(): [DetalhesState, DetalhesActions] {
  const router = useRouter();
  const parametros = useLocalSearchParams<{ id?: string | string[] }>();
  const produtoId = normalizarParametro(parametros.id);
  const [produto, setProduto] = useState<Produto | undefined>(undefined);
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProduto(): Promise<void> {
      setCarregando(true);
      setErro(null);

      try {
        const produtoEncontrado = produtoId
          ? await produtoDataSource.buscarPorId(produtoId)
          : undefined;
        setProduto(produtoEncontrado);
      } catch (erro: unknown) {
        setErro(obterMensagemErro(erro));
      } finally {
        setCarregando(false);
      }
    }

    void carregarProduto();
  }, [produtoId]);

  const state: DetalhesState = { produto, quantidade, carregando, erro };
  const actions: DetalhesActions = {
    incrementarQuantidade(): void {
      setQuantidade((quantidadeAtual) => quantidadeAtual + 1);
    },
    decrementarQuantidade(): void {
      setQuantidade((quantidadeAtual) => Math.max(1, quantidadeAtual - 1));
    },
    voltar(): void {
      router.back();
    },
  };

  return [state, actions];
}
