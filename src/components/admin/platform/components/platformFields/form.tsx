'use client'

import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {FormInstance, FormRule} from "antd";
import {IRoles} from "@/lib/validation/roles";
import {inputTypeAttb} from "@/lib/constants/inputTypeAttb"
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
    form: FormInstance<IRoles>,
    rule: any,
    pending:boolean,
    mode: string
}

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                              open,
                                                                              onCreate,
                                                                              onCancel,
                                                                              form,
                                                                              rule,
                                                                              mode,
                                                                              pending
                                                                          }) => {
    return (
        <Modal

            open={open}
            title={`${mode === 'create' ? 'create a new' : 'update'} platform fiels`}
            okText={<div  className="text-black">{mode === 'create' ? 'create' : 'update'}</div>}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="name"
                    label="name"
                    rules={[rule]}
                    required
                >
                    <Input/>
                </Form.Item>
                <Form.Item name="type" label="type" rules={[rule]} required>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {inputTypeAttb.map((item, index) => (
                            <Select.Option key={item.value} value={item.value}>{item.value}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
