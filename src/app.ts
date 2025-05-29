import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

//importacion de rutas

import authRoutes from './routes/Usuario/authRoutes'

import userRoutes from './routes/Usuario/userRoutes'

import productoRoutes from './routes/Producto/productoRoutes'

import detalleProductoRoutes from './routes/Producto/detalleProductoRoutes'

import imagenProductoRoutes from './routes/Producto/imagenProductoRoutes'

import precioRoutes from './routes/Producto/precioRoutes'

import descuentoRoutes from './routes/Producto/descuentoRoutes'

import talleRoutes from './routes/Producto/talleRoutes'

import categoriaRoutes from './routes/Producto/categoriaRoutes'

import usuarioDireccionRoutes from './routes/Usuario/usuarioDireccionRoutes'

import direccionesRoutes from './routes/Usuario/direccionRoutes'

import ordenCompraDetalleRoutes from './routes/Usuario/ordenCompraDetalleRoutes'

import ordenCompraRoutes from './routes/Usuario/ordenCompraRoutes'

const app = express()

app.use(express.json())

console.log('La aplicacion esta siendo ejecutada')

//uso de rutas
app.use('/auth', authRoutes)

app.use('/', userRoutes)

app.use('/productos', productoRoutes)

app.use('/detalleProducto', detalleProductoRoutes)

app.use ('/imagenProducto', imagenProductoRoutes)

app.use('/precio', precioRoutes)

app.use('/descuento', descuentoRoutes)

app.use('/talle', talleRoutes)

app.use('/categoria', categoriaRoutes)

app.use('/usuarioDireccion', usuarioDireccionRoutes)

app.use('/direccion', direccionesRoutes)

app.use('/ordenCompraDetalle', ordenCompraDetalleRoutes)

app.use('/ordenCompra', ordenCompraRoutes)

export default app