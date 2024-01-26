'use client'

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {UserForm} from "@/components/form/user-form";
import {useValidation} from "@/lib/hooks/use-validation";
import {IDetailUser, usersSchema} from "@/lib/validation/users";
import {useAuth} from "@/lib/hooks/use-auth";

import {toast} from "react-hot-toast";
import {ShellAction} from "@/components/common/shell-back";
import {catchError} from "@/lib/helpers";
import useApiUsers from "@/_actions/users";

export default function EditAccoutProfile() {
    const [isPending, startTransition] = React.useTransition()
    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation(usersSchema);
    const {profile, setTrigger} = useAuth();
    const {updateProfile, getUser} = useApiUsers();

    console.log("profile",profile)
    const setFiedsFn = (data: IDetailUser | undefined) => {
        if (data) {
            form.setFieldsValue({
                ...data?.user,
                role: data?.role?.map((item: any) => {
                    return Number(item?.role_id)
                }),
                password: ''
            })
            setImages(data?.user?.images)
        }
    }
    React.useEffect(() => {
        if (profile) {
            setFiedsFn(profile)
        }
    }, [profile]);

    const onFinish = (value: any) => {
        const payload = {
            ...value,
            userId: profile?.user?.id,
            user_id: profile?.user?.id,
           password: value?.password ? value?.password :profile?.user?.password
        }
        startTransition(() => {
            toast.promise((updateProfile(payload)),
                {
                    loading: "Loading...",
                    success: () => {
                         setTrigger(true)
                        return "Update success"
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })

    }

    const handleReset = () => {
        if (profile) {
            form.setFieldsValue(profile)
        }
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeader title="Account" desc="Edit your account"/>
                <ShellAction actionName="Back" href="/profile/account" type="link" />
            </div>
            <div>
                <UserForm onFinish={onFinish} form={form} handleReset={handleReset} setImages={setImages}
                          images={images} rule={rule} showPassw={false}
                          isPending={isPending}
                />
            </div>
        </>
    )
}