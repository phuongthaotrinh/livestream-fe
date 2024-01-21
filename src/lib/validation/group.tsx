
import {z} from "zod";

export const groupSchema = z.object({
    id: z.number().describe('id'),
    name: z.string().min(3).describe("name"),
    user_id: z.number().describe('user_id'),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status'),
});


export type IGroups = z.infer<typeof groupSchema>;

