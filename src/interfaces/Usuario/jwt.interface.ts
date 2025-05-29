import { Rol } from "@prisma/client";

export interface JwtPayload{
    id: number;
    email: string,
    contraseña: string,
    rol: Rol
}