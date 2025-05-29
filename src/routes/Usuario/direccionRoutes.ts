import express from 'express'

const router = express.Router()

import { authenticateToken } from '../../middlewares/authenticateToken'
import { createDireccion, deleteDireccion, editDireccion, getAllDirecciones, getDireccionById } from '../../controllers/Usuario/direccion.controller'
import { isAdmin } from '../../middlewares/isAdmin'

router.get('/', authenticateToken,  getAllDirecciones)

router.get('/:id', authenticateToken, getDireccionById)

router.post('/', isAdmin, createDireccion)

router.put('/:id', isAdmin, editDireccion)

router.delete('/:id', isAdmin, deleteDireccion)

export default router