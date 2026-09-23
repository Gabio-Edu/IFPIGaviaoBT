import { ItemDataSource } from "@/model/dataSource/ItemDataSource";
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
        ItemViewModel.useRooter(action.contentRequest)[0]();
        break;
      case "get-data":
        ItemViewModel.useDataSource()[0](
          action.contentRequest[0],
          action.contentRequest[1],
          action.contentRequest[2],
        );
        break;
      case "push-page":
      case action.action:
        break;
    }
  }
}
