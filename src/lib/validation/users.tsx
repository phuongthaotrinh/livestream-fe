import {Form, FormInstance, FormRule} from "antd";
import {z} from "zod";


const Roles = [
    'user',
    'admin',
    'superAdmin',
] as const

export const usersSchema = z.object({
    name: z.string().min(4, 'Username must be at least 4 characters').describe("Username"),
    fullName: z.string().min(3).describe("fullName"),
    password: z.string().min(8).optional().nullable().describe("Password"),
    roles: z.array(z.enum(Roles)).describe("Roles"),
    email: z.string().email()
});
export const authSigninSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').describe("Password"),

})


export const authSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).describe("Password"),
    verifyPassword: z.string().min(8).describe("verifyPassword"),
}).refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ["verifyPassword"],
});


export type IUser = z.infer<typeof usersSchema>;

