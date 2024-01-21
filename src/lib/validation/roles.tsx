import {z} from "zod";
export const rolesSchema = z.object({
    id: z.string(),
    name: z.string().min(4, 'name must be at least 4 characters').describe("name"),
})

export type IRoles = z.infer<typeof rolesSchema>;
