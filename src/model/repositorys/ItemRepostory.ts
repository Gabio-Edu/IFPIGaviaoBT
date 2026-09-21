import {
    simularConsultaProdutoPorId,
    simularConsultaProdutosPorCategoria,
} from "@/data/mockDatabase";
import IItem from "../entities/IItem";

class RepositoryItem {
  constructor() {}
  static async GetItemsByCategory(categoria: string): Promise<IItem[]> {
    return await simularConsultaProdutosPorCategoria(categoria);
  }
  static async GetItemsById(id: string): Promise<IItem> {
    return (await simularConsultaProdutoPorId(id)) as IItem;
  }
}
