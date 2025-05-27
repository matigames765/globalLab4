import { IProducto } from "../Producto/producto.interface";
import { IOrdenCompra } from "./ordenCompra.interface";

export interface IOrdenCompraDetalle{
    id: number,
    ordenCompra?: IOrdenCompra,
    producto: IProducto,
    cantidad: number
}