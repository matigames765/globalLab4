import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'
import { connect } from 'http2'


export const getAllDetalleProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const detalles = await prisma.detalleProducto.findMany({
            include:{
                talles: true,
                producto: true,
                precio: true,
                imagenProducto: true
            }
        })
        res.status(200).json(detalles)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllDetalleProductos: ' + error })
    }
}


export const getDetalleProductoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const detalle = await prisma.detalleProducto.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                talles: true,
                producto: true,
                precio: true,
                imagenProducto: true
            }
        })

        res.status(200).json(detalle)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle del producto no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getDetalleProductoById: ' + error })
    }
}


export const createDetalleProducto = async (req: Request, res: Response) => {
    try {
        const {stock, color, productoId, precioId, imagenProductoId} = req.body

        if(!stock  || !color|| !productoId || !precioId || !imagenProductoId){ 
            res.status(400).json({message: "El stock, color, producto id, precio id y id de la imagen del producto son obligatorios"})
            return
        }

        const detalle = await prisma.detalleProducto.create({
            data: {
                stock,
                color,
                producto: productoId ?
                {
                    connect: {
                        id: Number(productoId)
                    }
                }: undefined,
                precio: precioId ?
                {
                    connect: {
                        id: Number(precioId)
                    }
                }: undefined,
                imagenProducto: imagenProductoId ?
                {
                    connect: {
                        id: Number(imagenProductoId)
                    }
                }: undefined
            },
            include:{
                talles: true,
                producto: true,
                precio: true,
                imagenProducto: true
            }
        })

        res.status(201).json(detalle)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        res.status(500).json({ message: 'Error en createDetalleProducto: ' + error })
    }
}


export const editDetalleProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {stock, color, productoId, precioId, imagenProductoId} = req.body

        const updated = await prisma.detalleProducto.update({
            where: {
                id: Number(id)
            },
            data: {
                stock,
                color,
                producto: productoId ?
                {
                    connect: {
                        id: Number(productoId)
                    }
                }: undefined,
                precio: precioId ?
                {
                    connect: {
                        id: Number(precioId)
                    }
                }: undefined,
                imagenProducto: imagenProductoId ?
                {
                    connect: {
                        id: Number(imagenProductoId)
                    }
                }: undefined
            },
            include:{
                talles: true,
                producto: true,
                precio: true,
                imagenProducto: true
            }
        })

        res.status(200).json(updated)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle del producto no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editDetalleProducto: ' + error })
    }
}


export const deleteLogicoDetalleProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.detalleProducto.update({
            where: {
                id: Number(id)
            },
            data:{
                estado: false
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle del producto no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deleteLogicoDetalleProducto: ' + error })
    }
}


export const addTalleOnDetalleProducto = async(req:Request, res: Response) => {
    try{
        const {detalleProductoId, talleId} = req.params

        const detalleProducto = await prisma.detalleProducto.update({
            where:{
                id: Number(detalleProductoId)
            },
            data: {
                talles: {
                    connect: {
                        id: Number(talleId)
                    }
                }
            },
            include:{
                talles: true,
                producto: true,
                precio: true,
                imagenProducto: true
            }
        })

        res.status(200).json(detalleProducto)   
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El detalle producto no fue encontrado" })
            return
        }
        res.status(500).json({message: "Error en addTalleOnDetalleProducto en detallle producto: " + error})
    }
}