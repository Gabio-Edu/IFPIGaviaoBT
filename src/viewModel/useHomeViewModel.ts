import { useEffect, useState } from "react";
import { simularConsultaCategorias } from "../data/mockDatabase";
import { Category } from "@/model/entities/Category";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const resultado = await simularConsultaCategorias();
        setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return {
    carregando,
    categorias,
  };
}