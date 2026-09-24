import { ItemDataSource } from "@/model/dataSource/Item-data-source";
import { ImperativeRouter } from "expo-router";
import { Actions } from "./types";

export class ItemViewModel {
  static useRooter(router: ImperativeRouter): Array<() => void> {
    function backPage() {
      router.back();
    }

    return [backPage];
  }
  static useDataSource(): Array<
    (id: string, state: any, stateLocalStorage: any) => Promise<void>
  > {
    async function carregarDetalhes(
      id: string,
      setCarregando: (i: any) => void,
      setProduto: (i: any) => void,
    ) {
      if (!id) return;
      try {
        setCarregando(true);
        const prodId = Array.isArray(id) ? id[0] : id;
        const resultado = await ItemDataSource.GetItemsById(prodId);
        setProduto(resultado);
      } catch (erro) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    return [carregarDetalhes];
  }
  static sendAction(action: Actions): void {
    switch (action.action) {
      case "back-page":
        ItemViewModel.useRooter(action.contentRequest.router)[0]();
        break;
      case "get-data":
        ItemViewModel.useDataSource()[0](
          action.contentRequest.contentId!,
          action.contentRequest.state,
          action.contentRequest.localMemoState,
        );
        break;
      case "push-page":
      case action.action:
        break;
    }
  }
}
