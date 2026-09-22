import { ItemDataSource } from "@/model/dataSource/ItemDataSource";
import { useLocalSearchParams, useRouter } from "expo-router";




export class CategoryViewModel{
    static useRooter():Array<any>{
        const router=useRouter()
        function pushPage(i:any){
            router.push(i)
        }
        function backPage(){
            router.back()
        }
        return [pushPage,backPage]
    }
    static useDataSource():Array<any>{
          const { id } = useLocalSearchParams<{ id: string }>();
        
        async function carregarProdutos(setCarregando:(i:any)=>void,setProdutos:(i:any)=>void) {
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
        
        return [carregarProdutos]
    }
}