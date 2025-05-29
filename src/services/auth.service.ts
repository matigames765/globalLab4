import { SERVFAIL } from "dns"
import { IUser } from "../interfaces/Usuario/user.interface"
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'default-key'

export const generateToken = (user: IUser): string => {
    return jwt.sign({id:user.id, email: user.email, rol: user.rol}, SECRET_KEY, {expiresIn: '1h'})
}

