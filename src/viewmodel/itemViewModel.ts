import { ItemDataSource } from "@/model/dataSource/ItemDataSource";
import { useLocalSearchParams, useRouter } from "expo-router";

export class ItemViewModel{
    static useRooter():Array<any>{
        const router=useRouter()

        function pushPage(){
            router.back()
        }
        
        return [pushPage]
    }
    static useDataSource():Array<any>{
    const { id } = useLocalSearchParams<{ id: string }>();

       async function carregarDetalhes(setCarregando:(i:any)=>void,setProduto:(i:any)=>void) {
             if (!id) return;
             try {
               setCarregando(true);
               const prodId = Array.isArray(id) ? id[0] : id;
               const resultado = await ItemDataSource.GetItemsById(id);
               setProduto(resultado);
             } catch (erro) {
               console.error("Erro ao buscar detalhes do produto:", erro);
             } finally {
               setCarregando(false);
             }
           }
       
           
         
        return [carregarDetalhes]
    }
}