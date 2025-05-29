import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'

export const getAllDescuentos = async (req: Request, res: Response): Promise<void> => {
    try {
        const descuentos = await prisma.descuento.findMany()
        res.status(200).json(descuentos)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllDescuentos: ' + error })
    }
}


export const getDescuentoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const descuento = await prisma.descuento.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(descuento)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El descuento no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getDescuentoById: ' + error })
    }
}


export const createDescuento = async (req: Request, res: Response) => {
    try {
        const {fechaInicio, fechaFin} = req.body

        if(!fechaInicio  || !fechaFin){ 
            res.status(400).json({message: "la fecha de inicio y la de fin son obligatorias"})
            return
        }


        const descuento = await prisma.descuento.create({
            data: {
                fechaInicio,
                fechaFin
            }
        })

        res.status(201).json(descuento)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        res.status(500).json({ message: 'Error en createDescuento: ' + error })
    }
}


export const editDescuento = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {fechaInicio, fechaFin} = req.body

        const updated = await prisma.descuento.update({
            where: {
                id: Number(id)
            },
            data: {
                fechaInicio,
                fechaFin
            }
        })

        res.status(200).json(updated)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El descuento no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editDescuento: ' + error })
    }
}


export const deleteDescuento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.descuento.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El descuento no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deleteDescuento: ' + error })
    }
}
