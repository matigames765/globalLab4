import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'
import { unlink } from 'fs'


export const getAllOrdenCompraDetalles = async (req: Request, res: Response): Promise<void> => {
    try {
        const detalles = await prisma.ordenCompraDetalle.findMany({
            include:{
                ordenCompra: true,
                producto: true
            }
        })
        res.status(200).json(detalles)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllOrdenCompraDetalles: ' + error })
    }
}


export const getOrdenCompraDetalleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const detalle = await prisma.ordenCompraDetalle.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                ordenCompra: true,
                producto: true
            }
        })

        res.status(200).json(detalle)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getOrdenCompraDetalleById: ' + error })
    }
}


export const createOrdenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const {ordenCompraId, productoId, cantidad} = req.body

        if (!cantidad || !productoId || !ordenCompraId) {
            res.status(400).json({ message: "Los campos cantidad, productoId y ordenCompraId son obligatorios" })
            return
        }

        const detalle = await prisma.ordenCompraDetalle.create({
            data: {
                cantidad,
                producto: productoId ? {
                    connect: {
                        id: Number(productoId)
                    }
                }: undefined,
                ordenCompra: ordenCompraId ? {
                    connect: {
                        id: Number(ordenCompraId)
                    }
                }: undefined
            },
            include:{
                ordenCompra: true,
                producto: true
            }
        })

        res.status(201).json(detalle)
    } catch (error: any) {
        res.status(500).json({ message: 'Error en createOrdenCompraDetalle: ' + error })
    }
}


export const editOrdenCompraDetalle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { cantidad, productoId, ordenCompraId } = req.body

        const detalle = await prisma.ordenCompraDetalle.update({
            where: {
                id: Number(id)
            },
            data: {
                cantidad,
                producto: productoId ? {
                    connect: {
                        id: Number(productoId)
                    }
                }: undefined,
                ordenCompra: ordenCompraId ? {
                    connect: {
                        id: Number(ordenCompraId)
                    }
                }: undefined
            },
            include:{
                ordenCompra: true,
                producto: true
            }
        })

        res.status(200).json(detalle)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editOrdenCompraDetalle: ' + error })
    }
}


export const deleteOrdenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.ordenCompraDetalle.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deleteOrdenCompraDetalle: ' + error })
    }
}
