
import {z} from "zod";

export const platformsSchema = z.object({

    name: z.string().min(3).describe("name"),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status')
});

export type IPlatform = z.infer<typeof platformsSchema>;

