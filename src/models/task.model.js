import { Schema, model } from "mongoose"

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {timestamps: true})

export default model("tasks", taskSchema)