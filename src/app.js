import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'

const app = express()

app.use(cors({
    credentials: true,
    origin: 'https://gonzabillia.github.io'
}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', taskRoutes)

export default app