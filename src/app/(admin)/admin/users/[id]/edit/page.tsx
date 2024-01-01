'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {IDetailUser, usersSchema} from "@/lib/validation/users";
import {useRouter, useSearchParams} from "next/navigation";
import {UserForm} from "@/components/form/user-form";
import {ShellAction} from "@/components/common/shell-back";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect"

export default function UserIdPageEdit() {
    const router = useRouter();
    const searchParams = useSearchParams();


    const [form, rule] = useValidation(usersSchema);
    const [images, setImages] = React.useState<any[]>([]);
    const [data, setData] = React.useState<IDetailUser>();
    const [isPending, startTransition] = React.useTransition();

    const setFiedsFn = (data: IDetailUser | undefined) => {
        if (data) {
            form.setFieldsValue({
                ...data?.user,
                role: data?.role?.map((item: any) => {
                    return Number(item?.role_id)
                }),
                password: ''
            })
        }
    }

    const onFinish = (value: any) => {
        const payload = {
            ...value,
            userId: data?.user?.id,
            user_id: data?.user?.id,
            password: value?.password ? value?.password :data?.user?.password
        }


    }


    useIsomorphicLayoutEffect(() => {
        const dataParams = JSON.parse(searchParams.get('data')!);
        setData(dataParams)
        setFiedsFn(dataParams);
    }, []);


    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeader title="Edit User Profile" desc="edit infomation"/>
                <ShellAction actionName="Back" actionVoid={() => router.back()} type="action"/>
            </div>
            <div className="my-6">
                <UserForm onFinish={onFinish}
                          form={form}
                          setImages={setImages}
                          images={images}
                          rule={rule}
                          showPassw={false}
                          showRole={true}
                          editMail={true}
                          isPending={isPending}
                          handleReset={() => setFiedsFn(data)}
                />
            </div>
        </>
    )
}