import {z} from "zod";
export const permissionSchema = z.object({
    id: z.string(),
    name: z.string().min(4, 'name must be at least 4 characters').describe("name"),
})

export type IPers = z.infer<typeof permissionSchema>;