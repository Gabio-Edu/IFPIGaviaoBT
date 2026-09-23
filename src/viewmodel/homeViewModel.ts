import { CategoriaDataSource } from "@/model/dataSource/CategoriesDataSource";
import { ImperativeRouter } from "expo-router";
import { Actions } from "./types";

export class HomeViewModel {
  static useRooter(router: ImperativeRouter): Array<any> {
    function pushPage(i: any) {
      router.push(i);
    }

    return [pushPage];
  }
  static useDataSource(): Array<
    (state: any, stateLocalStorage: any) => Promise<void>
  > {
    async function carregarDados(
      setCarregando: (i: any) => void,
      setCategorias: (i: any) => void,
    ) {
      try {
        setCarregando(true);
        const resultado = await CategoriaDataSource.getCategorias();
        setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

    return [carregarDados];
  }
  static sendAction(action: Actions): void {
    switch (action.action) {
      case "push-page":
        HomeViewModel.useRooter(action.contentRequest[0])[0](
          action.contentRequest[1],
        );
        break;
      case "get-data":
        HomeViewModel.useDataSource()[0](
          action.contentRequest[0],
          action.contentRequest[1],
        );
        break;
      case "push-page":
      case action.action:
        break;
    }
  }
}
