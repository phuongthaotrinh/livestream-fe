'use client'
import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useAuth} from "@/lib/hooks/use-auth";
import {Card } from "antd"
 import {Button} from  "@/components/common/ui/button";
import {PlusCircle, Users} from "lucide-react";
import {GroupCard} from "@/components/admin/users/user-card/group-card";
import {UserGroupsShell} from "@/components/shells/user-groups-shell";
import {ShellAction} from "@/components/common/shell-back";
import {useEffect, useState} from "react";
import {hasAdminRole} from "@/lib/helpers";
import {useMounted} from "@/lib/hooks/use-mounted";

export default function ProfileGroup() {
    const {profile, setTrigger} = useAuth();
    const [isHasPer, setIsHasPer] = useState<boolean>(false);
    const mouted = useMounted()
    console.log("isHasPer",isHasPer);


    useEffect(() => {
        if(profile) {
            const check = hasAdminRole(profile?.role);
            setIsHasPer(check)
        }
    },[profile]);
    if (!profile) return null;

    return (
        <>
            {mouted && (
               <>
                   <PageHeader title="Account" desc="Manage your account settings"/>
                   <div className="mt-5">
                       <UserGroupsShell data={profile.groups}
                                        showCreateBtn={isHasPer}
                                        userId={profile?.user?.id}
                                        setTrigger={setTrigger}

                       />
                   </div>
               </>
                )}
        </>
    )
}