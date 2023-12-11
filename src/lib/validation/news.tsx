
import {z} from "zod";

export const newsSchema = z.object({

    title: z.string().min(3).describe("title"),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status'),
    images:z.any().describe('images'),
    content: z.any().describe("content"),
});


export type INews = z.infer<typeof newsSchema>;

