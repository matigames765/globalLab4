import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllImagenProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const imagenes = await prisma.imagenProducto.findMany()
        res.status(200).json(imagenes)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllImagenProductos: ' + error })
    }
}


export const getImagenProductoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const imagen = await prisma.imagenProducto.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(imagen)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La imagen del producto no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en getImagenProductoById: ' + error })
    }
}


export const createImagenProducto = async (req: Request, res: Response) => {
    try {
        const {url, alt} = req.body

        if(!url  || !alt){ 
            res.status(400).json({message: "La url y el alt son obligatorios"})
            return
        }

        const imagen = await prisma.imagenProducto.create({
            data: {
                url,
                alt
            }
        })

        res.status(201).json(imagen)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        res.status(500).json({ message: 'Error en createImagenProducto: ' + error })
    }
}


export const editImagenProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {url, alt} = req.body

        const updated = await prisma.imagenProducto.update({
            where: {
                id: Number(id)
            },
            data: {
                url,
                alt
            }
        })

        res.status(200).json(updated)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La imagen del producto no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en editImagenProducto: ' + error })
    }
}


export const deleteImagenProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.imagenProducto.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La imagen del producto no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en deleteImagenProducto: ' + error })
    }
}
