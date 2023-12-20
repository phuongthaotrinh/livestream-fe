import {z} from "zod";


const Roles = [
    'user',
    'admin',
    'superAdmin',
] as const

export const usersSchema = z.object({
    name: z.string().min(4, 'Username must be at least 4 characters').describe("Username"),
    fullName: z.string().min(3).describe("fullName"),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters long",
        })
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
            message:
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        }), roles: z.array(z.enum(Roles)).describe("Roles"),
    email: z.string().email(),
    address: z.string(),
    phoneNumber: z.string()
});
export const authSigninSchema = z.object({
    email: z.string().email('Invalid email address'),

    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters long",
        })
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
            message:
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        }),
})

export const authSignupSchema = z.object({
    name: z.string().min(4, 'Username must be at least 4 characters').describe("Username"),
    fullName: z.string().min(10).describe("fullName"),
    email: z.string().email(),
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",)
        .max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
            message:
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        }),

    verifyPassword: z.string().min(8),
})

export type IUsers = z.infer<typeof usersSchema>;
export type IAuthSignin = z.infer<typeof authSigninSchema>;
export type IAuthSignup = z.infer<typeof authSignupSchema>

