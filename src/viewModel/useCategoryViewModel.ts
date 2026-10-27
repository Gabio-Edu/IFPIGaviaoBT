import { useEffect, useState } from "react";
import { menuUseCases } from "@/di/container";
import { Product } from "@/model/entities/Product";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { formatarPreco, mensagemDeErro, normalizarParametro } from "./utils/helpers";

export function useCategoryViewModel(
  id: string | string[] | undefined,
  useCases: IMenuUseCases = menuUseCases
) {
  const categoriaId = normalizarParametro(id);

  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [nomeCategoria, setNomeCategoria] = useState<string>("Cardápio");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro(null);

        const resultado = await useCases.obterCardapioDaCategoria(categoriaId);

        if (ativo) {
          setProdutos(resultado.produtos);
          setNomeCategoria(resultado.nomeCategoria);
        }
      } catch (err) {
        if (ativo) {
          setProdutos([]);
          setErro(mensagemDeErro(err, "Não foi possível carregar os itens."));
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, [categoriaId, useCases]);

  return {
    carregando,
    produtos,
    nomeCategoria,
    erro,
    formatarPreco,
  };
}
