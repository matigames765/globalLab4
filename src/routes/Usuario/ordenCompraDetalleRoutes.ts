import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createOrdenCompraDetalle, deleteOrdenCompraDetalle, editOrdenCompraDetalle, getAllOrdenCompraDetalles, getOrdenCompraDetalleById } from '../../controllers/Usuario/ordenCompraDetalle.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllOrdenCompraDetalles)

router.get('/:id', authenticateToken, getOrdenCompraDetalleById)

router.post('/', isAdmin, createOrdenCompraDetalle)

router.put('/:id', isAdmin, editOrdenCompraDetalle)

router.delete('/:id', isAdmin, deleteOrdenCompraDetalle)

export default router