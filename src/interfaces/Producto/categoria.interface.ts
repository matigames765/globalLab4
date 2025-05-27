import { IProducto } from "./producto.interface";

export interface ICategoria{
    id: number,
    nombre: string,
    productos?: IProducto[]
}