
import {z} from "zod";

export const platformsSchema = z.object({

    name: z.string().min(3).describe("name"),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "isActive must be a boolean",
    }).describe('status')
});


export const platformsFieldsSchema = z.object({
    name: z.string().min(3).describe("name"),
    type: z.string().describe("type"),
    id: z.string().describe('id')
});

export const userHasPlatformSchema = z.object({
    id:z.number().describe('id'),
    platform_ids:z.array(z.string()),
    user_id:z.number().describe('user_id')

})

export type IPlatform = z.infer<typeof platformsSchema>;
export type IPlatformFields = z.infer<typeof platformsFieldsSchema>;
export type IUserHasPlatform = z.infer<typeof userHasPlatformSchema>