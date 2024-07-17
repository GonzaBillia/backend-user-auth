import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/task.controller.js'
import { createTaskSchema } from '../schemas/task.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'

const router = Router()

router.get('/tasks', authRequired, getTasks)

router.get('/tasks/:id', authRequired, getTask)

router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)

router.put('/task/:id', authRequired, updateTask)

router.delete('/tasks/:id', authRequired, deleteTask)

export default router