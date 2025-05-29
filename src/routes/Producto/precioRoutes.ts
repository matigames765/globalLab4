import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createPrecio, deletePrecio, editPrecio, getAllPrecios, getPrecioById } from '../../controllers/Producto/precio.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllPrecios)

router.get('/:id', authenticateToken, getPrecioById)

router.post('/', isAdmin, createPrecio)

router.put('/:id', isAdmin, editPrecio)

router.delete('/:id', isAdmin, deletePrecio)

export default router