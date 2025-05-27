import { Request, Response } from "express"
import prisma from "../../client/client";
import { comparePasswords, hashPassword} from "../../services/password.service";
import { generateToken } from "../../services/auth.service";


export const register = async(req: Request, res: Response): Promise<void> => {
    try{
        const {email, contraseña} = req.body; //agregar los otros campos

        if (!email || !contraseña){
            res.status(400).json({message: "El email y contraseña son obligatorios"})
            return
        }


        const hashedPassword = await hashPassword(contraseña)

        const user = await prisma.user.create({
            data: {
                email,
                contraseña: hashedPassword,
            }
        })

        const token = generateToken(user)

        res.status(201).json(token)
    }catch(error: any){
        if(error.code === 'P2002' && error.meta.target.includes('email')){
            res.status(400).json({message: "El email ingresado ya existe"})
        }
        res.status(500).json({message: "Error en el register"})
    }
}

export const login = async(req: Request, res: Response) => {
    try{

        const {email, contraseña} = req.body

        if(!email || !contraseña){
            res.status(400).json({message: "El email y la contraseña son obligatorios"})
            return
        }

        const user = await prisma.user.findUnique({where:{email}})

        if(!user){
            res.status(404).json({message: "El usuario ingresado no fue encontrado"})
            return
        }

        const comparePass = await comparePasswords(contraseña, user!.contraseña)

        if(!comparePass){
            res.status(401).json({message: "El usuario y contraseña no coinciden"})
            return
        }

        const token = generateToken(user!)

        res.status(200).json(token)

    }catch(error: any){
        res.status(500).json({message: 'Error al logearse: ' + error})
    }
}