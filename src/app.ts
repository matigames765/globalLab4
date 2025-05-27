import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(express.json())

console.log('La aplicacion esta siendo ejecutada')

//rutas
app.use('/auth', authRoutes)
app.use('/', userRoutes)

export default app