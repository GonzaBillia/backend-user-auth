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
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({email})

        if(!userFound) {
            return res.status(400).send("User not found")
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            return res.status(400).send("Wrong password")
        }

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        res.send({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            message: "User logged in"
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {expires: new Date(0)})
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id)

        if(!userFound) return res.status(404).send("User not found")

        return res.send({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}