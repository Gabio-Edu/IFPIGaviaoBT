import { ItemDataSource } from "@/model/dataSource/Item-data-source";
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
        CategoryViewModel.useRooter(action.contentRequest.router)[1]();
        break;
      case "get-data":
        CategoryViewModel.useDataSource()[0](
          action.contentRequest.contentId!,
          action.contentRequest.state,
          action.contentRequest.localMemoState,
        );
        break;
      case "push-page":
        CategoryViewModel.useRooter(action.contentRequest.router)[0](
          action.contentRequest.contentId,
        );
      case action.action:
        break;
    }
  }
}
