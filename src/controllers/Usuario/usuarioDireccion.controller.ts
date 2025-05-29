import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllUsuarioDirecciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioDirecciones = await prisma.usuarioDireccion.findMany({
            include: {
                user: true,
                direcciones: true
            }
        })
        res.status(200).json(usuarioDirecciones)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllUsuarioDirecciones: ' + error })
    }
}


export const getUsuarioDireccionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const usuarioDireccion = await prisma.usuarioDireccion.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                user: true,
                direcciones: true
            }
        })

        res.status(200).json(usuarioDireccion)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario direccion no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getUsuarioDireccionById: ' + error })
    }
}


export const createUsuarioDireccion = async (req: Request, res: Response) => {
    try {
        const {usuarioId
        } = req.body

        if (!usuarioId) {
            res.status(400).json({ message: "El id del usuario es obligatorio" })
            return
        }

        const usuarioDireccion = await prisma.usuarioDireccion.create({
            data: {
                user: usuarioId ?
                {
                    connect: {
                        id: Number(usuarioId)
                    }
                }: undefined
            },
            include:{
                    user:true,
                    direcciones: true
                }
        })

        res.status(201).json(usuarioDireccion)
    } catch (error: any) {
        res.status(500).json({ message: 'Error en createUsuarioDireccion: ' + error })
    }
}


export const editUsuarioDireccion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {usuarioId
        } = req.body

        const usuarioDireccion = await prisma.usuarioDireccion.update({
            where: {
                id: Number(id)
            },
            data: {
                user: usuarioId ? {
                    connect: {
                        id: Number(usuarioId)
                    }
                } : undefined
            }
            ,include:{
                user:true,
                direcciones: true
            }
        })

        res.status(200).json(usuarioDireccion)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario direccion no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editUsuarioDireccion: ' + error })
    }
}


export const deleteUsuarioDireccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.usuarioDireccion.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario direccion no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deleteUsuarioDireccion: ' + error })
    }
}

export const addDireccionOnUsuarioDireccion = async(req:Request, res: Response) => {
    try{
        const {usuarioDireccionId, direccionId} = req.params

        const usuarioDireccion = await prisma.usuarioDireccion.update({
            where:{
                id: Number(usuarioDireccionId)
            },
            data: {
                direcciones: {
                    connect: {
                        id: Number(direccionId)
                    }
                }
            }
            ,include:{
                user: true,
                direcciones: true
            }
        })

        res.status(200).json(usuarioDireccion)   
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El usuario direccion no fue encontrado" })
            return
        }
        res.status(500).json({message: "Error en addDireccionOnUsuarioDireccion en usuarioDireccion: " + error})
    }
}
