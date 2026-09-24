import { simularConsultaCategorias } from "@/data/mockDatabase";
import type { Categoria } from "@/model/categoria";

// O Model oferece à ViewModel a consulta assíncrona das categorias.
export async function buscarCategorias(): Promise<Categoria[]> {
  return simularConsultaCategorias();
}
