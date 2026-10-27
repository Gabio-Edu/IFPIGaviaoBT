import { useEffect, useState } from "react";
import { menuUseCases } from "@/di/container";
import { Category } from "@/model/entities/Category";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { mensagemDeErro } from "./utils/helpers";

export function useHomeViewModel(useCases: IMenuUseCases = menuUseCases) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await useCases.listarCategorias();
        if (ativo) setCategorias(resultado);
      } catch (err) {
        if (ativo) {
          setCategorias([]);
          setErro(mensagemDeErro(err, "Não foi possível carregar as categorias."));
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [useCases]);

  return {
    carregando,
    categorias,
    erro,
  };
}
