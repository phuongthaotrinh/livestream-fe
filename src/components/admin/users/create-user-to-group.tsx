'use client'

import React from 'react';
import {Form, Modal, Select} from 'antd';
import {FormInstance} from "antd";


interface ICreateUserFromGroup {
    open: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
    form: FormInstance,
    pending: boolean,
    data: any[]
}

export const CreateUserFromGroup: React.FC<ICreateUserFromGroup> = ({
                                                                        open,
                                                                        onCreate,
                                                                        onCancel,
                                                                        form,
                                                                        pending,
                                                                        data
                                                                    }) => {


    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: { children: string }) =>
        (option?.children ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Modal
            open={open}
            title="Add new user to group"
            okText={<div className="text-black">Create</div>}
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
                <Form.Item name="users" label="users">
                    <Select
                        placeholder="add user to group"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        mode={"multiple"}
                    >
                        {data && data.map((item, index) => (
                            <Select.Option key={index} value={item.id}>
                                {item.email}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
