import { simularConsultaCategorias } from "@/data/mockDatabase";
import ICategories from "../entities/I-categories";


export class CategoriaDataSource{
    static async getCategorias():Promise<ICategories[]>{
        return await simularConsultaCategorias()
    }
}