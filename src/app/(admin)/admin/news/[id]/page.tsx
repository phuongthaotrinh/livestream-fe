'use client';

import {useParams} from "next/navigation";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {INews, newsSchema} from "@/lib/validation/news";
import {PageHeader} from "@/components/common/page-header";
import {useApiAdditional} from "@/_actions/additional";
import {ShellAction} from "@/components/common/shell-back";
import {NewsForm} from "@/components/form/news-form";

export default function NewsDetail() {
    const {id} = useParams();
    const {getNews} = useApiAdditional();
    const [images, setImages] = React.useState<any[]>([]);
    const [form, rule] = useValidation(newsSchema);
    const [formContent, setFormContent] = React.useState<string>("");
    const [data, setData] = React.useState<INews | undefined>(undefined)
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        (async () => {
            const {data} = await getNews();
            const res = data?.find((item: any) => item?.id == id);
            if (res) {
                form.setFieldsValue(res);
                setImages([...images, res.image_link]);
                setFormContent(res.content)
            }
            setData(res);

        })()
    }, [id]);

    const onFinish = (value: any) => {
        value.image_link = images;
        value.content = formContent;
        value.id = Number(id);
        console.log('onFinish', value)
    }

    const handleReset = () => {
        setImages([data?.image_link]);
        setFormContent(data?.content)
        form.setFieldsValue(data ? data : {});
    }


    return (
        <>
            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Update" desc={`Update item: ${id}`}/>
                <div className="flex justify-end">
                    <ShellAction actionName="Back" type="link" href={'/admin/news'}/>
                </div>
            </div>
            <div className="my-6">
                <NewsForm onFinish={onFinish} form={form} setImages={setImages} images={images} rule={rule}
                          formContent={formContent}
                          setFormContent={setFormContent} isPending={isPending} handleReset={handleReset}/>
            </div>
        </>
    )
}