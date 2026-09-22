import type { Categoria } from "./categoria";

const DELAY_MS = 600;

const CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: require("../../assets/images/menu/categoria-comidas.png"),
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: require("../../assets/images/menu/categoria-bebidas.png"),
  },
];

export class CategoriaDataSource {
  async listarCategorias(): Promise<Categoria[]> {
    await new Promise<void>((resolve) => setTimeout(resolve, DELAY_MS));
    return [...CATEGORIAS];
  }
}
