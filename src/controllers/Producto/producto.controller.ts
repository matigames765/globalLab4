import {Request, Response} from 'express'
import prisma from '../../client/client'
import { comparePasswords, hashPassword } from '../../services/password.service'
import { generateToken } from '../../services/auth.service'
import { Prisma } from '@prisma/client'

export const getAllProductos = async(req: Request, res: Response): Promise<void> => {
    try{
        const productos = await prisma.producto.findMany(
            {
                include:{
                    categoria: true,
                    ordenCompraDetalle: true,
                    detallesProductos: true
                }
            }
        )

        res.status(200).json(productos)
    }catch(error){
        res.status(500).json({message: 'Error en getAllProductos: ' + error})
    }
}

export const getProductoById = async(req: Request, res: Response): Promise<void> => {
    try{
        const {id} =  req.params

        const producto = await prisma.producto.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                    categoria: true,
                    ordenCompraDetalle: true,
                    detallesProductos: true
                }
        })

        res.status(200).json(producto)
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en getProductoById: ' + error})
    }
}

export const createProducto = async(req: Request, res: Response) => {
    try{
        const {nombre, categoriaId, seccion, tipoProducto, ordenCompraDetalleId} = req.body

        if(!nombre  || !seccion || !tipoProducto || !categoriaId || !ordenCompraDetalleId){ //cambiar requerimientos
            res.status(400).json({message: "El nombre, id de la categoria, seccion y tipo de producto son obligatorios"})
            return
        }

        const producto = await prisma.producto.create({
            data:{
                nombre,
                categoria: categoriaId ? {
                    connect: {
                        id: Number(categoriaId)
                    }
                }: undefined,
                seccion,
                tipoProducto,
                ordenCompraDetalle: ordenCompraDetalleId ? {
                    connect: {
                        id: Number(ordenCompraDetalleId)
                    }
                }: undefined
            },
            include:{
                    categoria: true,
                    ordenCompraDetalle: true,
                    detallesProductos: true
                }
        })

        res.status(201).json(producto)

    }catch(error: any){
        if(error?.code === 'P2002' && error?.meta?.target?.includes('nombre')){
            res.status(400).json({message: "El nombre ingresado ya esta en uso"})
            return
        }
        res.status(500).json({message:'Error en createProducto: ' + error})
    }
}



export const editProducto = async(req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params
        const {nombre, categoriaId, seccion, tipoProducto, ordenCompraDetalleId} = req.body


        const updatedProducto = await prisma.producto.update({
            where: {
                id: Number(id)
            },
            data: {
                nombre,
                categoria: categoriaId ? {
                    connect:{
                        id: Number(categoriaId)
                    }
                }: undefined,
                seccion,
                tipoProducto,
                ordenCompraDetalle: ordenCompraDetalleId ? {
                    connect: {
                        id: Number(ordenCompraDetalleId)
                    }
                }: undefined
            },
            include:{
                    categoria: true,
                    ordenCompraDetalle: true,
                    detallesProductos: true
                }
        })

        if(!updatedProducto){
            res.status(404).json({message: "El producto no fue encontrado"})
            return
        }

        res.status(200).json(updatedProducto)
    }catch(error: any){
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message: "El nombre ingresado ya esta en uso"})
            return
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en editUser: ' + error})
    }
}

export const deleteProducto = async(req: Request, res: Response) => {
    try{
        const {id} = req.params

        const deleteProducto = await prisma.producto.delete({
            where:{
                id: Number(id)
            }
        })

        res.status(200).json(deleteProducto)
    }catch(error: any){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message:'Error en deleteProducto: ' + error})
    }
}

export const addDetalleProducto = async(req:Request, res: Response) => {
    try{
        const {productoId, detalleProductoId} = req.params

        const producto = await prisma.producto.update({
            where:{
                id: Number(productoId)
            },
            data: {
                detallesProductos: {
                    connect: {
                        id: Number(detalleProductoId)
                    }
                }
            }
            ,include:{
                    categoria: true,
                    ordenCompraDetalle: true,
                    detallesProductos: true
                }
        })

        res.status(200).json(producto)   
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: "El producto no fue encontrado" })
            return
        }
        res.status(500).json({message: "Error en addDetalleProducto en producto: " + error})
    }
}