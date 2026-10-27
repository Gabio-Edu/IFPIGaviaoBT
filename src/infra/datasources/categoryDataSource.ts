import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import { Category } from "@/model/entities/Category";
import { DataSourceError } from "@/model/errors";
import { atraso } from "./delay";

const BANCO_CATEGORIAS: Category[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: "categoria-comidas",
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: "categoria-bebidas",
  },
];

export class CategoryDataSource implements ICategoryDataSource {
  async listarTodas(): Promise<Category[]> {
    try {
      await atraso();
      return [...BANCO_CATEGORIAS];
    } catch (erro) {
      throw new DataSourceError("Não foi possível consultar as categorias.", erro);
    }
  }

  async buscarPorId(id: string): Promise<Category | undefined> {
    try {
      await atraso();
      return BANCO_CATEGORIAS.find((c) => c.id === id);
    } catch (erro) {
      throw new DataSourceError("Não foi possível consultar a categoria.", erro);
    }
  }
}
