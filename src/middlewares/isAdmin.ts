import { Rol } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { decode } from "punycode"

const SECRET_KEY = process.env.SECRET_KEY || 'default-key'

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1];

    try{

        const decoded = jwt.verify(token!, SECRET_KEY) as {id: number, rol: Rol}

        if(decoded.rol !== "ADMIN"){
            res.status(403).json({message: "No tienes acceso a este recurso, necesitas ser ADMIN"})
            return
        }

        next()

    }catch(error){
        res.status(401).json({message: 'token invalido'})
    }
}