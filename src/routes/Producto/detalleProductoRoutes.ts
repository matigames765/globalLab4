import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { addTalleOnDetalleProducto, createDetalleProducto, deleteLogicoDetalleProducto, editDetalleProducto, getAllDetalleProductos, getDetalleProductoById } from '../../controllers/Producto/detalleProducto.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllDetalleProductos)

router.get('/:id', authenticateToken, getDetalleProductoById)

router.post('/', isAdmin, createDetalleProducto)

router.put('/:id', isAdmin, editDetalleProducto)

router.put('/eliminadoLogico/:id', isAdmin, deleteLogicoDetalleProducto)

router.put('/:detalleProductoId/:detalleProductoId/talleId/:talleId', isAdmin, addTalleOnDetalleProducto)

export default router