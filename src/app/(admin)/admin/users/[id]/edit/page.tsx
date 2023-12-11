'use client';

import {Form, Button, Input, Space} from "antd"
import {PageHeader} from "@/components/common/page-header";
import * as React from "react"
import {UploadFile} from "@/components/common/upload-file"
import {useValidation} from "@/lib/hooks/use-validation"
import {usersSchema} from "@/lib/validation/users"
import { useParams} from "next/navigation";

export default function UserIdPage() {
    const {id} = useParams();
    const [images, setImages] = React.useState([]);
    const [form, rule] = useValidation(usersSchema);

    const onFinish = (value: any) => {
        console.log(value)
    }

    const handleReset = () => {
        setImages([]);
        form.resetFields();
    }


    return (
        <>
            <PageHeader title="Create" desc="create new users"/>
            <div className="my-6">
                <Form name="form1" layout="vertical" onFinish={onFinish} form={form}>

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
                    <Form.Item name="fullName" label="Full name" className="custom_ant_label" rules={[rule]} required>
                        <Input placeholder="Doraemon ep 1"/>
                    </Form.Item>
                    <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]} required>
                        <Input placeholder="Doraemon ep 1"/>
                    </Form.Item>
                    <Form.Item name="password" label="Password" className="custom_ant_label" rules={[rule]} required>
                        <Input.Password placeholder="input password"/>
                    </Form.Item>
                    <Space align="end">
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