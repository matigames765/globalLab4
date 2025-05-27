import express from 'express'

const router = express.Router()

import { authenticateToken } from '../middlewares/authenticateToken'
import { createUser, deleteUser, editUser, getAllUsers, getUserById } from '../controllers/Usuario/user.controller'

router.get('/user', authenticateToken,  getAllUsers)

router.get('/user/:id', authenticateToken, getUserById)

router.post('/user', authenticateToken, createUser)

router.put('/user/:id', authenticateToken, editUser)

router.delete('/user/:id', authenticateToken, deleteUser)

export default router