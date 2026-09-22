import { CategoriaDataSource } from "../model/categoriaDataSource";
import { ProdutoDataSource } from "../model/produtoDataSource";

const categoriaDataSource = new CategoriaDataSource();
const produtoDataSource = new ProdutoDataSource();

export async function simularConsultaCategorias() {
  return categoriaDataSource.listarCategorias();
}

export async function simularConsultaProdutosPorCategoria(
  categoriaId: string
) {
  return produtoDataSource.buscarPorCategoria(categoriaId);
}

export async function simularConsultaProdutoPorId(produtoId: string) {
  return produtoDataSource.buscarPorId(produtoId);
}
