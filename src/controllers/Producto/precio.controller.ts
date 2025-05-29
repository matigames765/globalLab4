import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'
import { connect } from 'http2'


export const getAllPrecios = async (req: Request, res: Response): Promise<void> => {
    try {
        const precios = await prisma.precio.findMany(
            {
                include: {
                    descuento: true
                }
            }
        )
        res.status(200).json(precios)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllPrecios: ' + error })
    }
}


export const getPrecioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const precio = await prisma.precio.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                    descuento: true
            }
        })

        res.status(200).json(precio)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El precio no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getPrecioById: ' + error })
    }
}


export const createPrecio = async (req: Request, res: Response) => {
    try {
        const {precioCompra, precioVenta, descuentoId} = req.body

        if(!precioCompra  || !precioVenta){ 
            res.status(400).json({message: "El precio de compra y de venta son obligatorios"})
            return
        }

        const precio = await prisma.precio.create({
            data: {
                precioCompra,
                precioVenta,
                descuento: descuentoId ?
                {
                    connect: {
                        id: Number(descuentoId)
                    }
                }: undefined
            },
            include: {
                    descuento: true
            }
        })

        res.status(201).json(precio)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        res.status(500).json({ message: 'Error en createPrecio: ' + error })
    }
}


export const editPrecio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {precioCompra, precioVenta, descuentoId} = req.body

        const updated = await prisma.precio.update({
            where: {
                id: Number(id)
            },
            data: {
                precioCompra,
                precioVenta,
                descuento: descuentoId ?
                {
                    connect: {
                        id: Number(descuentoId)
                    }
                }: undefined
            },
            include: {
                    descuento: true
            }
        })

        res.status(200).json(updated)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El precio no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editPrecio: ' + error })
    }
}


export const deletePrecio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.precio.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El precio no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deletePrecio: ' + error })
    }
}
