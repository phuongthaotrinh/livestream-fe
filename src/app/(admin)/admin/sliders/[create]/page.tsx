'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation"
import {ISliders, slidersSchema} from "@/lib/validation/sliders";
import {useApiAdditional} from "@/_actions/additional"
import {ShellAction} from "@/components/common/shell-back";
import {SliderForm} from "@/components/form/slider-form";

export default function SlidersCreatePage() {

    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation<ISliders>(slidersSchema);
    const {createSliders, getSliders} = useApiAdditional();
    const [isPending, startTransition] = React.useTransition()

    const onFinish = (value: any) => {
        value.image_link = images
        createSliders(value)
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }


    return (
        <>
            <div className="flex items-center justify-between w-full my-5">
                <PageHeader title="Create" desc="create new news"/>
                <ShellAction href="/admin/sliders" actionName="Back" type="link"/>
            </div>
            <div className="my-6">
                <SliderForm onFinish={onFinish} form={form} handleReset={handleReset} setImages={setImages}
                            images={images}
                            rule={rule} isPending={isPending}/>
            </div>
        </>
    )
}