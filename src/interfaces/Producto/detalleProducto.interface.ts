import { IImagenProducto } from "./imagenProducto.interface";
import { IPrecio } from "./precio.interface";
import { IProducto } from "./producto.interface";
import { ITalle } from "./talle.interface";

export interface IDetalleProducto{
    id: number,
    talles?: ITalle[],
    stock: number,
    color: string,
    estado?: boolean,
    producto?: IProducto,
    precio?: IPrecio,
    imagen?: IImagenProducto
}