import express from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken'
import { addProductoOnCategoria, createCategoria, deleteCategoria, editCategoria, getAllCategorias, getCategoriaById } from '../../controllers/Producto/categoria.controller'
import { isAdmin } from '../../middlewares/isAdmin'

const router = express.Router()

router.get('/', authenticateToken, getAllCategorias)

router.get('/:id', authenticateToken, getCategoriaById)

router.post('/', isAdmin, createCategoria)

router.put('/:id', isAdmin, editCategoria)

router.delete('/:id', isAdmin, deleteCategoria)

router.put('/:categoriaId/:categoriaId/productoId/:productoId', isAdmin, addProductoOnCategoria)

export default router