import express from 'express'

const router = express.Router()

import { authenticateToken } from '../../middlewares/authenticateToken'
import { addDireccionOnUsuarioDireccion, createUsuarioDireccion, deleteUsuarioDireccion, editUsuarioDireccion, getAllUsuarioDirecciones, getUsuarioDireccionById } from '../../controllers/Usuario/usuarioDireccion.controller'
import { isAdmin } from '../../middlewares/isAdmin'

router.get('/', authenticateToken,  getAllUsuarioDirecciones)

router.get('/id', authenticateToken, getUsuarioDireccionById)

router.post('/', isAdmin, createUsuarioDireccion)

router.put('/:id', isAdmin, editUsuarioDireccion)

router.delete('/:id', isAdmin, deleteUsuarioDireccion)

router.put('/usuarioDireccionId/:usuarioDireccionId/direccionId/:direccionId',isAdmin, addDireccionOnUsuarioDireccion)

export default router