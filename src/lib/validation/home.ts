
import {z} from "zod";

export const contactSchema = z.object({
    name: z.string().min(4, 'Username must be at least 4 characters').describe("Username"),
    email: z.string().email(),
    message: z.string().min(10, 'Your message must be at least 10 characters').describe("message"),
});

export const subscribeSchema = z.object({
    email: z.string().email(),
});

export type IContact = z.infer<typeof contactSchema>;
export type Isubscribe = z.infer<typeof subscribeSchema>;