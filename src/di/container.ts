// ============================================================================
// CONTAINER DE INJEÇÃO DE DEPENDÊNCIAS (Composition Root)
// Único lugar que conhece as implementações concretas da infraestrutura
// e as conecta aos Use Cases.
// ============================================================================

import { CategoryDataSource } from "@/infra/datasources/categoryDataSource";
import { ProductDataSource } from "@/infra/datasources/productDataSource";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { MenuUseCases } from "@/usecase/menuUseCases";

const categoryDataSource = new CategoryDataSource();
const productDataSource = new ProductDataSource();

export const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);
