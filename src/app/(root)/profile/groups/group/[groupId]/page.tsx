'use client'

import React, {useEffect, useState} from "react";
import {useAuth} from "@/lib/hooks/use-auth";
import {useMounted} from "@/lib/hooks/use-mounted"
import DetailGroupShell from "@/components/shells/detail-group-shell";
import {hasActivePermission, hasAdminRole} from "@/lib/helpers";
interface IParams extends React.PropsWithChildren {
    params: {
        groupId: number,

    }
}

export default function GroupDetailAuthPage ({params}:IParams) {
    const {profile} = useAuth();
    const mounted = useMounted();
    const [isHasPer, setIsHasPer] = useState<boolean>(false);
    console.log("isHasPer",isHasPer)
    useEffect(() => {
        if(profile) {
            const check = hasAdminRole(profile?.role);
            setIsHasPer(check)
        }
    },[profile]);

    {!mounted && <div className="h-screen w-screen grid place-items-center">Loading...</div>}
    return (
        <>
            {mounted && profile && <DetailGroupShell
                                        params={{groupId: Number(params?.groupId),id:Number(profile?.user?.id)}}
                                        key="client_space"
                                        isPreview={isHasPer}
                                    />
            }
        </>
    )
}