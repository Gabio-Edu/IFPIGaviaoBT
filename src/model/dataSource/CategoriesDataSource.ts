import { simularConsultaCategorias } from "@/data/mockDatabase";
import ICategories from "../entities/Icategories";


export class CategoriaDataSource{
    static async getCategorias():Promise<ICategories[]>{
        return await simularConsultaCategorias()
    }
}