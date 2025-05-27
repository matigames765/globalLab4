import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'default-key'

export const authenticateToken = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({error: 'No autorizado'})
        return
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if(err){
            console.log("Error en la autenticacion", err)
            return res.status(403).json({error: 'No tienes acceso a este recurso'})
        }

        next()

    })


}