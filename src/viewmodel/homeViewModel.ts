import { CategoriaDataSource } from "@/model/dataSource/CategoriesDataSource";
import { useRouter } from "expo-router";




export class HomeViewModel{
    static useRooter():Array<any>{
        const router=useRouter()

        function pushPage(i:any){
            router.push(i)
        }
        
        return [pushPage]
    }
    static useDataSource():Array<any>{
        async function carregarDados(setCarregando:(i:any)=>void,setCategorias:(i:any)=>void) {
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

        return [carregarDados]
    }
}