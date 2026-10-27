import { Category } from "@/model/entities/Category";

/** Contrato de acesso aos dados de categorias (implementado na camada de infraestrutura). */
export interface ICategoryDataSource {
  listarTodas(): Promise<Category[]>;
  buscarPorId(id: string): Promise<Category | undefined>;
}
