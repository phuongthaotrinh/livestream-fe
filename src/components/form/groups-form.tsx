'use client'
import {Checkbox, Form, Input, FormInstance, Button, Space} from "antd";
import {Rule} from "rc-field-form/es/interface";
import * as React from "react";
import {IGroups} from "@/lib/validation/group";

interface IGroupsForm {
    form: FormInstance<IGroups>,
    rule: Rule,
    handleReset: () => void,
    onFinish: (value: IGroups) => void,
    isPending: boolean,
    formName: string
}

export function GroupsForm({form, rule, onFinish, handleReset, isPending = false, formName}: IGroupsForm) {
    return (
        <Form name={formName} form={form} onFinish={onFinish} layout="vertical" className="space-y-6">
            <Form.Item name="name" label="group name" className="custom_ant_label" rules={[rule]}
                       required>
                <Input placeholder="group 1"/>
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
            <Space align="end">
                <Form.Item>
                    <Button htmlType="submit" type="primary" disabled={isPending}
                            className="bg-black block">Submit</Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" type="default"
                            className="block" onClick={handleReset}>Reset</Button>
                </Form.Item>
            </Space>
        </Form>
    )
}