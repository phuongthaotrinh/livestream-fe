'use client';


import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation"
import {newsSchema, INews} from "@/lib/validation/news";
import {useApiAdditional} from "@/_actions/additional"
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {ShellAction} from "@/components/common/shell-back";
import {NewsForm} from "@/components/form/news-form";

export default function NewsCreatePage() {
    const {updateStateNews} = useApiAdditional()
    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation<INews>(newsSchema);
    const [formContent, setFormContent] = React.useState<string>("");
    const [isPending, startTransition] = React.useTransition();
    console.log("NewsCreatePage",images)


    const onFinish = (value: any) => {
        value.image_link = images;
        value.content = formContent;

        startTransition(() => {
            toast.promise((updateStateNews(value)),
                {
                    loading: "Loading...",
                    success: () => "Creating successfully.",
                    error: (err: unknown) => catchError(err),
                }
            )

        })
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }


    return (
        <>
            <div className="flex items-center justify-between w-full mb-7">
                <PageHeader title="Create" desc="create new news"/>
                <ShellAction href="/admin/news" actionName="Back" type="link"/>
            </div>
            <div className="my-6">
                <NewsForm onFinish={onFinish} form={form} setImages={setImages} images={images} rule={rule}
                          formContent={formContent}
                          setFormContent={setFormContent} isPending={isPending} handleReset={handleReset}/>
            </div>
        </>
    )
}