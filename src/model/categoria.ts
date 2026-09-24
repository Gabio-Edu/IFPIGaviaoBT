import type { ImageSourcePropType } from "react-native";

// Entidade tipada com os campos que já existem no mockDatabase.
export type Categoria = {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: ImageSourcePropType;
};
