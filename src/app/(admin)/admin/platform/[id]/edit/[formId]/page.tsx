'use client';

import {PageHeader} from "@/components/common/page-header";
import React from 'react';
import {ShellAction} from "@/components/common/shell-back";
import {usePlatform} from "@/lib/hooks/use-platform";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {PlatformForm} from "@/components/form/platform-form";
import {useValidation} from "@/lib/hooks/use-validation";
import {platformsSchema} from "@/lib/validation/platform";
import {useRouter} from "next/navigation";
import useApiPlatform from "@/_actions/platforms";

export default function Platform() {
    const {platforms, setTrigger, liveStreamTypeData} = usePlatform()
    const [data, setData] = useLocalStorage('data',window.history.state);
    const [form, rule] = useValidation(platformsSchema);
    const router = useRouter()

    React.useEffect(() => {

    },[])


    const onFinish = (value: any) => {
        // value.platform_id = Number(params.id);
        // value.field_name = JSON.stringify(value.field_name);
        // startTransition(() => {
        //     toast.promise((createPlatformField(value)), {
        //         loading: 'creating..',
        //         error: (err) => catchError(err),
        //         success: (data) => {
        //             handleReset();
        //             return 'create success'
        //         }
        //     })
        // })
    }
    React.useEffect(() => {
        form.setFieldValue('live_type_id',data?.live_type_info?.id)
    },[data]);

    const handleReset = () => {
        // form.resetFields();
    }
    return (
        <>

            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Create" desc={`create new form of platform:`}/>
                <div className="flex justify-end">
                    <ShellAction type="action" actionName="Back" actionVoid={() => router.back()}/>
                </div>
            </div>
            <div className="my-6">
                <PlatformForm onFinish={onFinish} form={form} handleReset={handleReset} rule={rule}/>
            </div>

        </>
    )
}
