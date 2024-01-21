"use client";

import {createContext, startTransition} from "react";
import React from "react";
import useApiPlatform from "@/_actions/platforms";
import {ILiveStreamType, IPlatform} from "@/lib/validation/live-stream-type";
import {IAuthSignin} from "@/lib/validation/users";
import {http} from "@/config/http";

interface PlatformContextType {
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    platforms: IPlatform[],
    liveStreamTypeData: ILiveStreamType[]
}

const intialContext = {
    setTrigger: () => {
        // Implement the setTrigger function
    },
    setPlatformIdHandler: (newPlatformId: number) => {
    },
    platforms: [],
    liveStreamTypeData: []
}

const PlatformContext = createContext<PlatformContextType | null>(intialContext);
export default PlatformContext;


export const PlatformProviders = ({children}: { children: React.ReactNode }) => {
    const [trigger, setTrigger] = React.useState<boolean>(false)
    const {getAll, ListFormsOfPlatform} = useApiPlatform()
    const [platforms, setPlatforms] = React.useState<IPlatform[]>([])
    const [liveStreamTypeData, setLiveStreamTypeData] = React.useState<ILiveStreamType[]>([])

    const fetchData = async (): Promise<void> => {
        try {
            const {data} = await getAll();
            setLiveStreamTypeData(data?.liveStreamTypeData)
            setPlatforms(data?.liveStreamplatFormData);
        } catch (error) {
            console.error('Error in fetching roles:', error);
        }
    };


    React.useEffect(() => {
        startTransition(() => {
            fetchData()
        });
        if (trigger) startTransition(() => {
            fetchData()
        });
    }, [trigger]);




    return (
        <PlatformContext.Provider
            value={{setTrigger, platforms, liveStreamTypeData}}>
            {children}
        </PlatformContext.Provider>
    )
}

