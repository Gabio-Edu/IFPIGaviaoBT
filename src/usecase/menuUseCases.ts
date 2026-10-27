import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import { IProductDataSource } from "@/model/datasources/iProductDataSource";
import { Category } from "@/model/entities/Category";
import { Product } from "@/model/entities/Product";
import { ValidationError } from "@/model/errors";
import { CardapioDaCategoria, IMenuUseCases } from "./iMenuUseCases";

const NOME_CATEGORIA_PADRAO = "Cardápio";
const QUANTIDADE_MINIMA = 1;

/**
 * Regras de negócio do cardápio.
 * Depende apenas das ABSTRAÇÕES dos datasources (DIP) — nunca de implementações concretas.
 */
export class MenuUseCases implements IMenuUseCases {
  constructor(
    private readonly categoryDataSource: ICategoryDataSource,
    private readonly productDataSource: IProductDataSource
  ) {}

  async listarCategorias(): Promise<Category[]> {
    return this.categoryDataSource.listarTodas();
  }

  async obterCardapioDaCategoria(categoriaId: string): Promise<CardapioDaCategoria> {
    const id = this.validarId(categoriaId, "Categoria inválida.");

    const [categoria, produtos] = await Promise.all([
      this.categoryDataSource.buscarPorId(id),
      this.productDataSource.listarPorCategoria(id),
    ]);

    return {
      nomeCategoria: categoria?.nome ?? NOME_CATEGORIA_PADRAO,
      produtos,
    };
  }

  async obterProduto(produtoId: string): Promise<Product | undefined> {
    const id = this.validarId(produtoId, "Produto inválido.");
    return this.productDataSource.buscarPorId(id);
  }

  incrementarQuantidade(quantidadeAtual: number): number {
    return Math.max(QUANTIDADE_MINIMA, quantidadeAtual + 1);
  }

  // Regra de negócio: a quantidade nunca pode ficar abaixo do mínimo
  decrementarQuantidade(quantidadeAtual: number): number {
    return Math.max(QUANTIDADE_MINIMA, quantidadeAtual - 1);
  }

  private validarId(id: string, mensagem: string): string {
    const limpo = id?.trim();
    if (!limpo) {
      throw new ValidationError(mensagem);
    }
    return limpo;
  }
}
