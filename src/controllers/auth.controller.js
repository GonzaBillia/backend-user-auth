import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"

export const register = async (req, res) => {
    const {username, email, password} = req.body

    try {

        const passHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passHash
        })
    
        const userSaved = await newUser.save()

        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)
        res.send({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            message: "User created"
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const login = async (req, res) => {
    const {username, email, password} = req.body

    try {

        const passHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passHash
        })
    
        const userSaved = await newUser.save()

        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)
        res.send({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            message: "User created"
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}