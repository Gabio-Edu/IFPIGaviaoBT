import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { buscarCategorias } from "@/model/categoria-data-source";
import type { Categoria } from "@/model/categoria";

type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

type HomeActions = {
  carregarCategorias: () => Promise<void>;
  navegarParaCategoria: (categoriaId: string) => void;
};

export function useHomeViewModel(): readonly [HomeState, HomeActions] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  // A ViewModel concentra o estado e a consulta usada pela tela.
  const carregarCategorias = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await buscarCategorias();
      setCategorias(dados);
    } catch {
      setErro("Não foi possível carregar as categorias.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregarCategorias();
  }, [carregarCategorias]);

  const state: HomeState = { categorias, carregando, erro };
  const actions: HomeActions = {
    carregarCategorias,
    navegarParaCategoria: (categoriaId) => {
      router.push({ pathname: "/category/[id]", params: { id: categoriaId } });
    },
  };

  return [state, actions];
}
