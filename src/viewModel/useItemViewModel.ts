import { useEffect, useState } from "react";
import { simularConsultaProdutoPorId } from "../data/mockDatabase";

export function useItemViewModel(id: string | string[] | undefined) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<any>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!id) return;

      try {
        setCarregando(true);

        const prodId = Array.isArray(id) ? id[0] : id;
        const resultado = await simularConsultaProdutoPorId(prodId);
        setProduto(resultado);
      } catch (erro) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [id]);

  function decrementarQuantidade() {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  }

  function incrementarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return {
    carregando,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  };
}