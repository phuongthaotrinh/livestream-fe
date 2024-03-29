
import {z} from "zod";

export const newsSchema = z.object({

    title: z.string().min(3).describe("title"),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status'),
    image_link:z.any().describe('images'),
    content: z.any().describe("content"),
    id: z.number().describe('id'),
    preview: z.string().describe("preview"),
});


export type INews = z.infer<typeof newsSchema>;

