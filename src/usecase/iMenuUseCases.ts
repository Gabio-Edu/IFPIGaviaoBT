import { Category } from "@/model/entities/Category";
import { Product } from "@/model/entities/Product";

export type CardapioDaCategoria = {
  nomeCategoria: string;
  produtos: Product[];
};

/** Contrato dos casos de uso do cardápio — única dependência das ViewModels. */
export interface IMenuUseCases {
  listarCategorias(): Promise<Category[]>;
  obterCardapioDaCategoria(categoriaId: string): Promise<CardapioDaCategoria>;
  obterProduto(produtoId: string): Promise<Product | undefined>;
  incrementarQuantidade(quantidadeAtual: number): number;
  decrementarQuantidade(quantidadeAtual: number): number;
}
