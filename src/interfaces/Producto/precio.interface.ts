import { IDescuento } from "./descuento.interface";

export interface IPrecio{
    id: number,
    precioCompra: number,
    precioVenta: number,
    descuento?: IDescuento
}