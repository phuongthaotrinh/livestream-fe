'use client';

import {Card, Modal, Form, Input} from "antd";
import {IDetailUser, usersSchema} from "@/lib/validation/users";
import {Button} from "@/components/common/ui/button"
import {ShellAction} from "@/components/common/shell-back";
import {PlusCircle} from "lucide-react";
import {UserGroupsShell} from "@/components/shells/user-groups-shell";
import useApiUsers from "@/_actions/users";
import {useApiAdditional} from "@/_actions/additional";
import {toast} from "react-hot-toast";
import React from 'react';
import {GroupsForm} from "@/components/form/groups-form";
import {useValidation} from "@/lib/hooks/use-validation";
import {groupSchema, IGroups} from "@/lib/validation/group";

interface IGroupCard {
    data: IDetailUser,
    params: any,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    showCreateBtn: boolean
}

export function GroupCard({data, params, setTrigger, showCreateBtn}: IGroupCard) {
    const [isPending, startTransition] = React.useTransition();
    const [open, setOpen] = React.useState<boolean>(false)
    const {updateStateGroups} = useApiAdditional();
    const [form, rule] = useValidation(groupSchema);
    const [canAddGroup, setCanAddGroup] = React.useState<boolean>(false)


    const onFinish = (values: IGroups) => {
        values.user_id = Number(params.id);

        startTransition(() => {
            toast.promise((updateStateGroups(values)), {
                loading: 'Loading',
                success: () => {
                    setOpen(false);
                    form.resetFields();
                    setTrigger(true);
                    return "create group successfully"
                },
                error: 'errr'
            })
        })
    }


    return (
        <>
            <Card title="Groups">
                {showCreateBtn && <ShellAction icon={PlusCircle} actionName="New groups" type="action" flex="start"
                                               actionVoid={() => {
                                                   setOpen(true)
                                               }}
                />}
                <UserGroupsShell data={data.groups}/>

                <Modal open={open} okType="dashed" footer={null}
                       onCancel={() => {
                           setOpen(false);
                           form.resetFields()
                       }}>
                    <GroupsForm form={form} rule={rule} handleReset={() => {form.resetFields();}} onFinish={onFinish}
                                isPending={isPending}
                                formName="create_group"/>
                </Modal>
            </Card>

        </>
    )
}