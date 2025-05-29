import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createOrdenCompra, deleteOrdenCompra, editOrdenCompra, getAllOrdenesCompra, getOrdenCompraById } from '../../controllers/Usuario/ordenCompra.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllOrdenesCompra)

router.get('/:id', authenticateToken, getOrdenCompraById)

router.post('/', isAdmin, createOrdenCompra)

router.put('/:id', isAdmin, editOrdenCompra)

router.delete('/:id', isAdmin, deleteOrdenCompra)

export default router