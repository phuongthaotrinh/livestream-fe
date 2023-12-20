'use client'
import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useAuth} from "@/lib/hooks/use-auth";

export default function ProfileGroup() {
    const {profile} = useAuth();
    if (!profile) return null;
    console.log(profile)

    //call api to watch user belong with groups

    return (
        <>
            <PageHeader title="Account" desc="Manage your account settings"/>
                <div className="mt-5">
                    You do not manage any groups
                </div>


        </>
    )
}