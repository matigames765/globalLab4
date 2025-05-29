import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllOrdenesCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const ordenes = await prisma.ordenCompra.findMany(
            {
                include:{
                    usuarioDireccion: true,
                    descuento: true
                }
            }
        )
        res.status(200).json(ordenes)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllOrdenesCompra: ' + error })
    }
}


export const getOrdenCompraById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const orden = await prisma.ordenCompra.findUnique({
            where: {
                id: Number(id)
            }
            ,include:{
                usuarioDireccion: true,
                descuento: true
            }
        })

        res.status(200).json(orden)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La orden de compra no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en getOrdenCompraById: ' + error })
    }
}


export const createOrdenCompra = async (req: Request, res: Response) => {
    try {
        const { usuarioDireccionId, total, descuentoId, fechaCompra} = req.body

        if (!usuarioDireccionId || !total|| !descuentoId || !fechaCompra) {
            res.status(400).json({ message: "Todos los campos son obligatorios" })
            return
        }

        const orden = await prisma.ordenCompra.create({
            data: {
                usuarioDireccion: usuarioDireccionId ?
                {
                    connect: {
                        id: Number(usuarioDireccionId)
                    }
                }: undefined,
                total,
                descuento: descuentoId ?
                {
                    connect: {
                        id: Number(descuentoId)
                    }
                }: undefined,
                fechaCompra
            },
            include: {
                usuarioDireccion: true,
                descuento: true
            }
        })

        res.status(201).json(orden)
    } catch (error: any) {
        res.status(500).json({ message: 'Error en createOrdenCompra: ' + error })
    }
}

export const editOrdenCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { usuarioDireccionId, total, descuentoId, fechaCompra } = req.body

        const orden = await prisma.ordenCompra.update({
            where: {
                id: Number(id)
            },
            data: {
                 usuarioDireccion: usuarioDireccionId ?
                {
                    connect: {
                        id: Number(usuarioDireccionId)
                    }
                }: undefined,
                total,
                descuento: descuentoId ?
                {
                    connect: {
                        id: Number(descuentoId)
                    }
                }: undefined,
                fechaCompra
            },
            include: {
                usuarioDireccion: true,
                descuento: true
            }
        })

        res.status(200).json(orden)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La orden de compra no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en editOrdenCompra: ' + error })
    }
}


export const deleteOrdenCompra = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.ordenCompra.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La orden de compra no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en deleteOrdenCompra: ' + error })
    }
}
