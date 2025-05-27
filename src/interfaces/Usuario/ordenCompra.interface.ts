import { IDescuento } from "../Producto/descuento.interface";
import { IUsuarioDireccion } from "./usuarioDireccion.interface";

export interface IOrdenCompra{
    id: number,
    usuarioDireccion?: IUsuarioDireccion,
    total: number,
    descuento?: IDescuento,
    fechaCompra: string
}