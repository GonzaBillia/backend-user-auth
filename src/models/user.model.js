import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true,
    toJSON: {virtuals: true}
})

//Relacion Virtual
userSchema.virtual("tasks", {
    ref: "tasks",
    localField: "_id",
    foreignField: "users",
    justOne: false
})

export default model("users", userSchema)