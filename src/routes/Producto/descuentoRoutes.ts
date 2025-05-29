import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createDescuento, deleteDescuento, editDescuento, getAllDescuentos, getDescuentoById } from '../../controllers/Producto/descuento.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllDescuentos)

router.get('/:id', authenticateToken, getDescuentoById)

router.post('/', isAdmin, createDescuento)

router.put('/:id', isAdmin, editDescuento)

router.delete('/:id', isAdmin, deleteDescuento)

export default router