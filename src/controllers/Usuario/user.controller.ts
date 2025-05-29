import {Request, Response} from 'express'
import prisma from '../../client/client'
import { comparePasswords, hashPassword } from '../../services/password.service'
import { generateToken } from '../../services/auth.service'
import { Prisma } from '@prisma/client'

export const getAllUsers = async(req: Request, res: Response): Promise<void> => {
    try{
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: 'Error en getAllUsers: ' + error})
    }
}

export const getUserById = async(req: Request, res: Response): Promise<void> => {
    try{
        const {id} =  req.params

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(user)
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en getUserById: ' + error})
    }
}

export const createUser = async(req: Request, res: Response) => {
    try{
        const {nombre, email, contraseña, dni, rol, usuarioDireccionId} = req.body

        if(!nombre || !email || !contraseña || !dni || !rol){
            res.status(400).json({message: "El nombre, email, contraseña, dni y rol son obligatorios"})
            return
        }

        const hashPass = await hashPassword(contraseña)
        const user = await prisma.user.create({
            data:{
                nombre,
                email,
                contraseña: hashPass,
                dni,
                rol,
                usuarioDireccion: usuarioDireccionId
          ? { connect: { id: Number(usuarioDireccionId) } }
          : undefined,
            }
        })

        res.status(201).json(user)

    }catch(error: any){
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message: "El email ingresado ya esta en uso"})
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en createUser: ' + error})
    }
}



export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, email, contraseña, dni, rol, usuarioDireccionId } =
      req.body;

    const hashPass = await hashPassword(contraseña);

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        email,
        contraseña: hashPass,
        dni,
        rol,
        usuarioDireccion: usuarioDireccionId
          ? { connect: { id: Number(usuarioDireccionId) } }
          : undefined,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ message: "El email ingresado ya esta en uso" });
      return;
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario no fue encontrado" })
            return
    }
    res.status(500).json({ message: "Error en editUser: " + error });
  }
};

export const deleteUser = async(req: Request, res: Response) => {
    try{
        const {id} = req.params

        const deleteUser = await prisma.user.delete({
            where:{
                id: Number(id)
            }
        })

        res.status(200).json(deleteUser)
    }catch(error: any){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en deleteUser: ' + error})
    }
}