import {
  simularConsultaProdutoPorId,
  simularConsultaProdutosPorCategoria,
} from "@/data/mockDatabase";
import type { Produto } from "@/model/produto";

// As consultas permanecem assíncronas e mantêm o delay definido no mockDatabase.
export async function buscarProdutosPorCategoria(
  categoriaId: string
): Promise<Produto[]> {
  return simularConsultaProdutosPorCategoria(categoriaId);
}

export async function buscarProdutoPorId(
  produtoId: string
): Promise<Produto | undefined> {
  return simularConsultaProdutoPorId(produtoId);
}
