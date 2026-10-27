import { Product } from "@/model/entities/Product";

/** Contrato de acesso aos dados de produtos (implementado na camada de infraestrutura). */
export interface IProductDataSource {
  listarPorCategoria(categoriaId: string): Promise<Product[]>;
  buscarPorId(id: string): Promise<Product | undefined>;
}
