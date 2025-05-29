import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { createTalle, deleteTalle, editTalle, getAllTalles, getTalleById } from '../../controllers/Producto/talle.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllTalles)

router.get('/:id', authenticateToken, getTalleById)

router.post('/', isAdmin, createTalle)

router.put('/:id', isAdmin, editTalle)

router.delete('/:id', isAdmin, deleteTalle)

export default router