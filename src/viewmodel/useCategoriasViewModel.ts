import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import type { Categoria } from "../model/categoria";
import { CategoriaDataSource } from "../model/categoriaDataSource";

const categoriaDataSource = new CategoriaDataSource();

export type CategoriasState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type CategoriasActions = {
  abrirCategoria(id: string): void;
};

function obterMensagemErro(erro: unknown): string {
  return erro instanceof Error ? erro.message : "Não foi possível carregar as categorias.";
}

export function useCategoriasViewModel(): [CategoriasState, CategoriasActions] {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCategorias(): Promise<void> {
      setCarregando(true);
      setErro(null);

      try {
        const categoriasEncontradas = await categoriaDataSource.listarCategorias();
        setCategorias(categoriasEncontradas);
      } catch (erro: unknown) {
        setErro(obterMensagemErro(erro));
      } finally {
        setCarregando(false);
      }
    }

    void carregarCategorias();
  }, []);

  const state: CategoriasState = { categorias, carregando, erro };
  const actions: CategoriasActions = {
    abrirCategoria(id: string): void {
      router.push({ pathname: "/category/[id]", params: { id } });
    },
  };

  return [state, actions];
}
