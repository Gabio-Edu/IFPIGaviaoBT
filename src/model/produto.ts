import type { ImageSourcePropType } from "react-native";

// Produto representa os campos usados e armazenados no mockDatabase.
export type Produto = {
  id: string;
  categoriaId: string;
  categoriaNome: string;
  nome: string;
  preco: number;
  descricao: string;
  proteinas: string;
  carboidratos: string;
  gorduras: string;
  imagem: ImageSourcePropType;
  imagemGrande: ImageSourcePropType;
};
