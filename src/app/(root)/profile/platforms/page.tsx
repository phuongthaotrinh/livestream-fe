"use client";


import {RegisterPlatformsCard} from "@/components/admin/users/user-card/register-platform-card";
import * as React from "react";
import {useAuth} from "@/lib/hooks/use-auth";

export default function AuthPlatform () {
    const {profile, setTrigger} = useAuth();
    return (
        <>
            <RegisterPlatformsCard data={profile?.platforms}
                                   setTrigger={setTrigger}
                                   showCreateBtn={true}
                                   user_has_pl_id={profile?.user_has_pl_id}

            />
        </>
    )
}