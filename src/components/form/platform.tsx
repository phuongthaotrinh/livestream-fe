'use client';
import {Button, Form, FormInstance, Input, Switch} from "antd";
import {Rule} from "rc-field-form/es/interface";
import React from "react";

interface ILiveStreamTypeForm {
    form: FormInstance<any>,
    onFinish: (values: any) => void,
    rule: Rule,
    isPending: boolean
}

export function PlatformForm({form,rule,isPending, onFinish}: ILiveStreamTypeForm) {
    const id = React.useId()
    return (
        <Form name={`platform.${id}`} form={form}  layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" className="custom_ant_label" rules={[rule]}>
                <Input placeholder="Sport" />
            </Form.Item>
            <Form.Item name="status" label="status" className="custom_ant_label" rules={[rule]}>
                <Switch  onChange={() => console.log('cahnag')} />
            </Form.Item>

            <Form.Item colon style={{marginTop: '1.5rem'}}>
                <Button type="primary" htmlType="submit" disabled={isPending}
                        className="bg-black cursor-pointer"
                >
                    {isPending ? 'Sending...' : 'Submit'}
                </Button>
            </Form.Item>

        </Form>
    )
}