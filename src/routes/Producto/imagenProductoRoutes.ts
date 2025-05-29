import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createImagenProducto, deleteImagenProducto, editImagenProducto, getAllImagenProductos, getImagenProductoById } from '../../controllers/Producto/imagenProducto.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllImagenProductos)

router.get('/:id', authenticateToken, getImagenProductoById)

router.post('/', isAdmin, createImagenProducto)

router.put('/:id', isAdmin, editImagenProducto)

router.delete('/:id', isAdmin, deleteImagenProducto)


export default router