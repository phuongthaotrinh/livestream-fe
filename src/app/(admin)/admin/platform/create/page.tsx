'use client';

import {Form, Button, Input, Space,Checkbox } from "antd"
import {PageHeader} from "@/components/common/page-header";
import * as React from "react"
import {UploadFile} from "@/components/common/upload-file"
import {useValidation} from "@/lib/hooks/use-validation"
import {platformsSchema} from "@/lib/validation/platform";
import Link from "next/link";
import {MoveLeft, Plus} from "lucide-react";
import clsx from "clsx";
import {buttonVariants} from "@/components/ui/button";

export default function UserCreatePage() {
    const [images, setImages] = React.useState([]);
    const [form, rule] = useValidation(platformsSchema);

    const onFinish = (value: any) => {
        console.log(value)
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }

    return (
        <>
           <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
               <PageHeader title="Create" desc="create new platform"/>
               <div className="flex justify-end">
                   <Link aria-label="Create new row" href="/admin/news">
                       <div
                           className={clsx(
                               buttonVariants({
                                   variant: "outline",
                                   size: "sm",
                                   className: "h-8",
                               })
                           )}
                       >
                           <MoveLeft className="mr-2 h-4 w-4" aria-hidden="true"/>
                           Back
                       </div>
                   </Link>
               </div>
           </div>
            <div className="my-6">
                <Form name="form1" layout="vertical"
                      initialValues={{ status: true }}
                      onFinish={onFinish} form={form}>
                    <div className="mb-3">
                        <Form.Item
                            name="images"
                            label="Images"
                            className="custom_ant_label"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            required>
                            <UploadFile
                                max={2}
                                hierarchy={false}
                                onRemove={(data: any) => {
                                    setImages(images.filter((current) => current !== data))
                                }}
                                onChange={(data: any) => {
                                    //@ts-ignore
                                    setImages([...images, data])
                                }}
                                value={images}
                            />
                        </Form.Item>
                        <div className="flex items-center gap-3">
                            {images && images.map((item, index) => (
                                <div className=" relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"
                                     key={index}>
                                    <div className="z-10 absolute top-2 right-2">
                                        <Button
                                            htmlType="button"
                                            onClick={() => {
                                                setImages(images.filter((current) => current !== item))
                                            }}
                                        >
                                            X
                                        </Button>
                                    </div>
                                    <img className="object-cover" alt="Image" src={item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Form.Item name="name" label="display name" className="custom_ant_label" rules={[rule]} required>
                        <Input placeholder="Doraemon ep 1"/>
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        valuePropName="checked"
                        rules={[rule]} required
                        className="custom_ant_label "

                    >
                        <Checkbox>
                            {Form.useWatch('status', form)== true ? 'Show' : "Hidden"}
                        </Checkbox>
                    </Form.Item>
                    <Space align="end" className="mt-3">
                        <Form.Item>
                            <Button htmlType="submit" type="primary"
                                    className="bg-black block">Submit</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="button" type="default"
                                    className="block" onClick={handleReset}>Reset</Button>
                        </Form.Item>
                    </Space>
                </Form>
            </div>
        </>
    )
}