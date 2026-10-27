import { useEffect, useState } from "react";
import { menuUseCases } from "@/di/container";
import { Product } from "@/model/entities/Product";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { formatarPreco, mensagemDeErro, normalizarParametro } from "./utils/helpers";

export function useItemViewModel(
  id: string | string[] | undefined,
  useCases: IMenuUseCases = menuUseCases
) {
  const produtoId = normalizarParametro(id);

  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<Product | undefined>(undefined);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhes() {
      try {
        setCarregando(true);
        setErro(null);

        const resultado = await useCases.obterProduto(produtoId);
        if (ativo) setProduto(resultado);
      } catch (err) {
        if (ativo) {
          setProduto(undefined);
          setErro(mensagemDeErro(err, "Não foi possível carregar os detalhes do item."));
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDetalhes();

    return () => {
      ativo = false;
    };
  }, [produtoId, useCases]);

  function decrementarQuantidade() {
    setQuantidade((atual) => useCases.decrementarQuantidade(atual));
  }

  function incrementarQuantidade() {
    setQuantidade((atual) => useCases.incrementarQuantidade(atual));
  }

  return {
    carregando,
    produto,
    quantidade,
    erro,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  };
}
