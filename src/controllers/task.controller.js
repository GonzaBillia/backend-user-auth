import Task from "../models/task.model.js"

export const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).populate("user")
    res.status(200).json(tasks)
}

export const getTask = async (req, res) => {
    try {
        const {id} = req.params

        const task = await Task.findById(id).populate("user")

        if(!task) return res.status(404).send("Task not found")

        return res.status(200).json(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })

        const taskSaved = await newTask.save()
        res.status(201).send(taskSaved)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDUpdate(req.params.id, req.body, {new:true})

        if(!task) return res.status(404).send("Task not found")

        return res.sendStatus(204).send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) return res.status(404).send("Task not found")

        return res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}