'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {platformsSchema} from "@/lib/validation/platform";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import {PlatformForm} from "@/components/form/platform-form";
import {ShellAction} from "@/components/common/shell-back";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number
    }
}

const rawData = {
    "form_name": "tops tops",
    "status": true,
    "field_name": [
        {
            "name": "name",
            "type": "text"
        },
        {
            "name": "email",
            "type": "text"
        }
    ]
}
export default function PlatformDetailPage({params}: IParams) {
    const router = useRouter()
    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation(platformsSchema);
    const data = JSON.parse(JSON.stringify(rawData));
    console.log('data', data)

    React.useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
            setImages(data.images ? data.images : [])
        }
    }, [])

    const onFinish = (value: any) => {
        console.log('values', value);
        toast(JSON.stringify(value, undefined, 2))
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }


    return (
        <>
            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Detail" desc={`update platform id:${params.id}`}/>
                <div className="flex justify-end">
                    <ShellAction type="action" actionName="Back" actionVoid={() => router.back()}/>

                </div>
            </div>
            <div className="my-6">
                <PlatformForm onFinish={onFinish} form={form} handleReset={handleReset} images={images}
                              setImages={setImages} rule={rule}/>
            </div>
        </>
    )
}