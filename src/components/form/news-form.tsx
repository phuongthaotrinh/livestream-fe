'use client'

import {Button, Checkbox, Form, FormInstance, Input, Space} from "antd";
import {UploadFile} from "@/components/common/upload-file";
import {Editor} from "@/components/common/text-editor";
import * as React from "react";
import {Rule} from "rc-field-form/es/interface";

interface INewsForm {
    onFinish: (values: any) => void,
    form: FormInstance<any>,
    setImages: React.Dispatch<React.SetStateAction<any[]>>,
    images: any[],
    rule: Rule,
    formContent: string,
    setFormContent: React.Dispatch<React.SetStateAction<string>>,
    isPending: boolean,
    handleReset: () => void
}

export function NewsForm({onFinish, form, rule, images, setImages, formContent, setFormContent, isPending, handleReset}: INewsForm) {
    const id = React.useId()
    return (
        <>
            <Form name={`news-form.${id}`} layout="vertical" onFinish={onFinish} form={form}>

                <div className="mb-3">
                    <Form.Item
                        name="image_link"
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
                            max={1}
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
                <Form.Item name="title" label="title" className="custom_ant_label" rules={[rule]} required>
                    <Input placeholder="Doraemon ep 1"/>
                </Form.Item>
                <Form.Item name="preview" label="preview" className="custom_ant_label" rules={[rule]} required>
                    <Input.TextArea rows={4} placeholder="Doraemon is the best" maxLength={255}/>
                </Form.Item>
                <Form.Item name="content" label="content" className="custom_ant_label">
                    <Editor formContent={formContent} setFormContent={setFormContent}/>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                    rules={[rule]} required
                    className="custom_ant_label "

                >
                    <Checkbox>
                        {Form.useWatch('status', form) == true ? 'Show' : "Hidden"}
                    </Checkbox>
                </Form.Item>
                <Space align="end" className="mt-3">
                    <Form.Item>
                        <Button htmlType="submit" type="primary" loading={isPending}
                                className="bg-black block">Submit</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="button" type="default"
                                className="block" onClick={handleReset}>Reset</Button>
                    </Form.Item>
                </Space>
            </Form>
        </>
    )
}