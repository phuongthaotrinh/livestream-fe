'use client'

import React, {useState} from 'react';
import {Button, Form, Input, Modal, Radio} from 'antd';
import {FormInstance, FormRule} from "antd";
import {IRoles} from "@/lib/validation/roles";

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
            title="Create a new collection"
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
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
