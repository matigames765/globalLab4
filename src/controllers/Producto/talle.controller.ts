import { Request, Response } from 'express'
import prisma from '../../client/client'
import { Prisma } from '@prisma/client'


export const getAllTalles = async (req: Request, res: Response): Promise<void> => {
    try {
        const talles = await prisma.talle.findMany()
        res.status(200).json(talles)
    } catch (error) {
        res.status(500).json({ message: 'Error en getAllTalles: ' + error })
    }
}


export const getTalleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const talle = await prisma.talle.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(talle)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El talle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en getTalleById: ' + error })
    }
}


export const createTalle = async (req: Request, res: Response) => {
    try {
        const {talle} = req.body

       

        if(!talle){ 
            res.status(400).json({message: "El talle es obligatorio"})
            return
        }

        const tallee = await prisma.talle.create({
            data: {
                talle
            }
        })

        res.status(201).json(tallee)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        res.status(500).json({ message: 'Error en createTalle: ' + error })
    }
}


export const editTalle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const {talle} = req.body

        const updated = await prisma.talle.update({
            where: {
                id: Number(id)
            },
            data: {
                talle
            }
        })

        res.status(200).json(updated)
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(400).json({ message: "Algún campo ya está en uso (único)" })
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El talle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en editTalle: ' + error })
    }
}


export const deleteTalle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleted = await prisma.talle.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(deleted)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El talle no fue encontrado" })
            return
        }
        res.status(500).json({ message: 'Error en deleteTalle: ' + error })
    }
}
