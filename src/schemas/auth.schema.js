import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
    }),
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Must be a valid email"
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(4)
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Must be a valid email"
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(4)
})