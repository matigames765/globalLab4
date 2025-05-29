import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
        const categorias = await prisma.categoria.findMany()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllCategorias: ' + error })
    }
}


export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const categoria = await prisma.categoria.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(categoria)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La categoría no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en getCategoriaById: ' + error })
    }
}


export const createCategoria = async (req: Request, res: Response) => {
    try {
        const {nombre} = req.body

        if(!nombre){ 
            res.status(400).json({message: "el nombre es obligatorio"})
            return
        }

        const categoria = await prisma.categoria.create({
            data: {
                nombre
            }
        })

        res.status(201).json(categoria)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "El nombre ya está en uso" })
            return
        }
        res.status(500).json({ message: 'Error en createCategoria: ' + error })
    }
}


export const editCategoria = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {nombre} = req.body

        const updatedCategoria = await prisma.categoria.update({
            where: {
                id: Number(id)
            },
            data: {
                nombre
            }
        })

        res.status(200).json(updatedCategoria)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "El nombre ya está en uso" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La categoría no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en editCategoria: ' + error })
    }
}


export const deleteCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.categoria.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La categoría no fue encontrada" })
            return
        }
        res.status(500).json({ message: 'Error en deleteCategoria: ' + error })
    }
}

export const addProductoOnCategoria = async(req:Request, res: Response) => {
    try{
        const {categoriaId, productoId} = req.params

        const categoria = await prisma.categoria.update({
            where:{
                id: Number(categoriaId)
            },
            data: {
                productos: {
                    connect: {
                        id: Number(productoId)
                    }
                }
            }
        })

        res.status(200).json(categoria)   
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "La categoria no fue encontrada" })
            return
        }
        res.status(500).json({message: "Error en addProductoOnCategoria en categoria: " + error})
    }
}
