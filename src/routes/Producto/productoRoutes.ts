import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { addDetalleProducto, createProducto, deleteProducto, editProducto, getAllProductos, getProductoById } from '../../controllers/Producto/producto.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllProductos)

router.get('/:id', authenticateToken, getProductoById)

router.post('/', isAdmin, createProducto)

router.put('/:id', isAdmin, editProducto)

router.delete('/:id', isAdmin, deleteProducto)

router.put('/productoId/:productoId/detalleProductoId/:detalleProductoId', isAdmin, addDetalleProducto)

export default router