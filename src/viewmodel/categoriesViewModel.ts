import { ItemDataSource } from "@/model/dataSource/ItemDataSource";
import { ImperativeRouter } from "expo-router";
import { Actions } from "./types";

export class CategoryViewModel {
  static useRooter(router: ImperativeRouter): Array<any> {
    function pushPage(i: any) {
      router.push(i);
    }
    function backPage() {
      router.back();
    }
    return [pushPage, backPage];
  }
  static useDataSource(): Array<
    (id: string, state: any, stateLocalStorage: any) => Promise<void>
  > {
    async function carregarProdutos(
      id: string,
      setCarregando: (i: any) => void,
      setProdutos: (i: any) => void,
    ) {
      if (!id) return;
      try {
        setCarregando(true);
        const resultado = await ItemDataSource.GetItemsByCategory(
          Array.isArray(id) ? id[0] : id,
        );
        setProdutos(resultado);
      } catch (erro) {
        console.error("Erro ao buscar produtos da categoria:", erro);
      } finally {
        setCarregando(false);
      }
    }

    return [carregarProdutos];
  }
  static sendAction(action: Actions): void {
    switch (action.action) {
      case "back-page":
        CategoryViewModel.useRooter(action.contentRequest)[1]();
        break;
      case "get-data":
        CategoryViewModel.useDataSource()[0](
          action.contentRequest[0],
          action.contentRequest[1],
          action.contentRequest[2],
        );
        break;
      case "push-page":
        CategoryViewModel.useRooter(action.contentRequest[0])[0](
          action.contentRequest[1],
        );
      case action.action:
        break;
    }
  }
}
