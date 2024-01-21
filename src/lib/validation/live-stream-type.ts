import {z} from "zod";

export const livesStreamTypeSchema = z.object({
    id: z.number().describe('id'),
    name: z.string().min(3).describe("name")
});

export const platformSchema = z.object({
    id: z.number().describe('id'),
    name: z.string().min(3).describe("name"),
    status:z.boolean()
});


export type ILiveStreamType = z.infer<typeof livesStreamTypeSchema>;
export type IPlatform = z.infer<typeof platformSchema>;


export type ResponseData = {
    liveStreamTypeData:ILiveStreamType[],
    liveStreamplatFormData:IPlatform[]
}

export type ITypesHasPlatform ={
    id: number,
    platform_id:number,
    live_type_id:number
}


export type IListFormOfPlatform = {
    info: ITypesHasPlatform,
    live_type_info: ILiveStreamType,
    platform_info:IPlatform
}