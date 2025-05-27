import { IDireccion } from "./direccion.interface";
import { IUser } from "./user.interface";

export interface IUsuarioDireccion{
    id: number,
    usuario: IUser,
    direcciones?: IDireccion
}