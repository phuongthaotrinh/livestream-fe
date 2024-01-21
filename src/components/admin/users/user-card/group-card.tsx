'use client';

import {Card} from "antd";
import {IDetailUser} from "@/lib/validation/users";
import {UserGroupsShell} from "@/components/shells/user-groups-shell";
import React from 'react';

interface IGroupCard {
    data: IDetailUser,
    params: any,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    showCreateBtn: boolean
}

export function GroupCard({data, params, setTrigger, showCreateBtn}: IGroupCard) {
    return (
        <>
            <Card title="Groups">
                <UserGroupsShell data={data.groups} showCreateBtn={showCreateBtn} key="admin" userId={params.id} setTrigger={setTrigger}/>
            </Card>

        </>
    )
}