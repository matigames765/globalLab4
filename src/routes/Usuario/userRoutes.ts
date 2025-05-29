import express from 'express'

const router = express.Router()

import { authenticateToken } from '../../middlewares/authenticateToken'
import { createUser, deleteUser, editUser, getAllUsers, getUserById } from '../../controllers/Usuario/user.controller'
import { isAdmin } from '../../middlewares/isAdmin'

router.get('/user', authenticateToken,  getAllUsers)

router.get('/user/:id', authenticateToken, getUserById)

router.post('/user', isAdmin, createUser)

router.put('/user/:id', isAdmin, editUser)

router.delete('/user/:id', isAdmin, deleteUser)

export default router