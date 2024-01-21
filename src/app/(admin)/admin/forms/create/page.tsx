'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {platformsSchema} from "@/lib/validation/platform";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import {PlatformForm} from "@/components/form/platform-form";
import {ShellAction} from "@/components/common/shell-back";
import useApiPlatform from "@/_actions/platforms";
import {catchError} from "@/lib/helpers";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number
    }
}

export default function PlatformCreatePage({params}: IParams) {
    const router = useRouter()
    const [form, rule] = useValidation(platformsSchema);
    const [isPending, startTransition] = React.useTransition();
    const {createPlatformField} = useApiPlatform();

    const onFinish = (value: any) => {
        value.live_type_id = Number(value.live_type_id);
        value.field_name = JSON.stringify(value.field_name);
        startTransition(() => {
            toast.promise((createPlatformField(value)), {
                loading: 'creating..',
                error: (err) => catchError(err),
                success: (data) => {
                    handleReset();
                    return 'create success'
                }
            })
        })
    }

    const handleReset = () => {
        form.resetFields();
    }


    return (
        <>
            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Create" desc={`create new form`}/>
                <div className="flex justify-end w-full">
                    <ShellAction type="action" actionName="Back" actionVoid={() => router.back()}/>
                </div>
            </div>
            <div className="my-6">
                <PlatformForm onFinish={onFinish} form={form} handleReset={handleReset} rule={rule}/>
            </div>
        </>
    )
}