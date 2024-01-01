'use client'
import {Button, Card, Checkbox, Form, FormInstance, Input, Select, Space} from "antd";
import {UploadFile} from "@/components/common/upload-file";
import {inputTypeAttb} from "@/lib/constants/inputTypeAttb";
import {MinusCircle, PlusCircle} from "lucide-react";
import * as React from "react";
import {Rule} from "rc-field-form/es/interface";

type IPlatformForm = {
    onFinish: (values:any) => void,
    form:FormInstance<any>,
    handleReset:() => void,
    images:any[],
    setImages: React.Dispatch<React.SetStateAction<any[]>>,
    rule:Rule

}

export function PlatformForm({onFinish, form,handleReset, images, setImages,rule}:IPlatformForm) {
    return (
        <>
            <Form name="form1" layout="vertical"
                  initialValues={{status: true}}
                  onFinish={onFinish} form={form}>
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


                <Card title="infomation" className="my-6">
                    <div className="mb-3">
                        <Form.Item
                            name="images"
                            label="Images"
                            className="custom_ant_label"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your password!',
                            //     },
                            // ]}
                            // required
                        >
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
                                <div
                                    className=" relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"
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
                    <Form.Item name="form_name" label="Platform name" className="custom_ant_label" rules={[rule]}
                               required>
                        <Input placeholder="Tiktok.."/>
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

                </Card>


                <Card>
                    <Card.Meta title="Variant"
                               description={<div className={"grid text-gray-400"}>
                                   <p>
                                       Add variations of this platform. <br/>
                                       Offer your customers different options for name, email, shape, etc.
                                   </p>

                               </div>}
                    />
                    <div className="my-6">

                        <Form.List name="field_name">
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, ...restField}) => (
                                        <div key={key} className="grid grid-cols-3 gap-5">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                rules={[{required: true, message: 'Missing name'}]}

                                            >
                                                <Input placeholder="Name"/>
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'type']}
                                                rules={[{required: true, message: 'Missing type'}]}
                                                style={{minWidth: '350px'}}
                                            >

                                                <Select
                                                    placeholder="choose type"
                                                    allowClear
                                                    showSearch

                                                >
                                                    {inputTypeAttb.map((item, index) => (
                                                        <Select.Option key={index} value={item.value}>
                                                            {item.type}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <MinusCircle onClick={() => remove(name)}/>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block
                                                icon={<PlusCircle className="w-4 h-4"/>}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>

                </Card>


            </Form>


        </>
    )
}