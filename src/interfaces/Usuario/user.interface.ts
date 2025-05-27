import { Rol } from "./rol.enum";
import { IUsuarioDireccion } from "./usuarioDireccion.interface";
import {Rol as rolPrisma} from "@prisma/client"


export interface IUser{
    id: number,
    nombre?: string | null,
    contraseña: string,
    email: string,
    dni?: string | null,
    rol?: rolPrisma | null,
    usuarioDireccion?: IUsuarioDireccion | null,
}