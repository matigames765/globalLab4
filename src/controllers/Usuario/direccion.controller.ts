import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllDirecciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const direcciones = await prisma.direccion.findMany()
        res.status(200).json(direcciones)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllDirecciones: ' + error })
    }
}


export const getDireccionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const direccion = await prisma.direccion.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(direccion)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La dirección no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en getDireccionById: ' + error })
    }
}


export const createDireccion = async (req: Request, res: Response) => {
    try {
        const {localidad, pais, provincia, departamento } = req.body

        if (!localidad || !provincia || !pais || !departamento) {
            res.status(400).json({ message: "Todos los campos son obligatorios" })
            return
        }

        const direccion = await prisma.direccion.create({
            data: {
                localidad,
                provincia,
                pais,
                departamento
            }
        })

        res.status(201).json(direccion)
    } catch (error: any) {
        res.status(500).json({ message: 'Error en createDireccion: ' + error })
    }
}

export const editDireccion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { localidad, pais, provincia, departamento } = req.body

        const direccion = await prisma.direccion.update({
            where: {
                id: Number(id)
            },
            data: {
                localidad,
                pais,
                provincia,
                departamento
            }
        })

        res.status(200).json(direccion)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La dirección no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en editDireccion: ' + error })
    }
}


export const deleteDireccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.direccion.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La dirección no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en deleteDireccion: ' + error })
    }
}
