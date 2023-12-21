
import {z} from "zod";

export const slidersSchema = z.object({
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status'),
    image_link:z.any().describe('images'),
    position: z.string(),
    id: z.string()
});


export type ISliders = z.infer<typeof slidersSchema>;
