'use client'
import {Button, Card, Checkbox, Form, FormInstance, Input, Select, Space} from "antd";
import {UploadFile} from "@/components/common/upload-file";
import {inputTypeAttb} from "@/lib/constants/inputTypeAttb";
import {MinusCircle, PlusCircle} from "lucide-react";
import * as React from "react";
import {Rule} from "rc-field-form/es/interface";
import useApiPlatform from "@/_actions/platforms";
import {usePlatform} from "@/lib/hooks/use-platform";

type IPlatformForm = {
    onFinish: (values: any) => void,
    form: FormInstance<any>,
    handleReset: () => void,
    rule: Rule

}

export function PlatformForm({onFinish, form, handleReset,rule}: IPlatformForm) {
    const {platforms, liveStreamTypeData, setTrigger} = usePlatform()





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
                    <Form.Item name="form_name" label="form_name" className="custom_ant_label" rules={[rule]}
                               required>
                        <Input placeholder="Tiktok.."/>
                    </Form.Item>

                    <Form.Item label="live_type_id" name="live_type_id" className="custom_ant_label" rules={[rule]}>
                        <Select>
                            {liveStreamTypeData && liveStreamTypeData?.map((item) => (
                                <Select.Option value={item?.id} key={item?.id}>
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
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
                                                name={[name, 'field_name']}
                                                rules={[{required: true, message: 'Missing name'}]}

                                            >
                                                <Input placeholder="Name"/>
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'field_data']}
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