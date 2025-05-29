import { IOrdenCompraDetalle } from "../Usuario/ordenCompraDetalle.interface";
import { ICategoria } from "./categoria.interface";
import { IDetalleProducto } from "./detalleProducto.interface";
import { ISeccion } from "./seccion.enum";
import { TipoProducto } from "./tipoProducto.enum";

export interface IProducto{
    id: number,
    nombre: string,
    categoria?: ICategoria | null,
    seccion?: ISeccion |null,
    tipoProducto: TipoProducto,
    detallesProductos?: IDetalleProducto[],
    ordenCompraDetalle?: IOrdenCompraDetalle | null,
}