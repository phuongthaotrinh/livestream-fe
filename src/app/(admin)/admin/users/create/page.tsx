'use client';

import {Form, Button, Input, Space, Card, Checkbox} from "antd";
import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation"
import {usersSchema} from "@/lib/validation/users";
import {UserForm} from "@/components/form/user-form";
import {ShellAction} from "@/components/common/shell-back";
import {toast} from "react-hot-toast";
import useApiUsers from "@/_actions/users";
import {catchError} from "@/lib/helpers";
import useApiRoles from "@/_actions/roles";

export default function UserCreatePage() {
    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation(usersSchema);
    const [isPending, startTransition] = React.useTransition();
    const {createUser} = useApiUsers()
    const {assignRoleForUser}  = useApiRoles()

    const onFinish = (value: any) => {
        value.images = images;
        startTransition(() => {
            toast.promise((createUser(value)),
                {
                    loading: "Creating...",
                    success: (data) => {
                        console.log('create success =>', data);
                       if(data?.data) {
                           (async () => {
                                await assignRoleForUser({
                                    user_id: data?.data?.id,
                                    role_id: Number(value.role)
                                })
                           })()
                       }
                       form.resetFields();
                        return "Creating user succesfully"
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })


        toast(
            `${JSON.stringify(value, null, 2)}`,
            {
                duration: 6000,
            }
        );
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }


    return (
        <>
            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Create" desc="create new users"/>
                <ShellAction actionName="Back" href="/admin/users" type="link"/>
            </div>
            <div className="my-6 space-y-6">
                <UserForm onFinish={onFinish} form={form} handleReset={handleReset} setImages={setImages}
                          images={images} rule={rule}
                          showPassw={true} editMail={true} isPending={isPending} showRole={false}
                            isAdminMode={true}
                />
            </div>
        </>
    )
}