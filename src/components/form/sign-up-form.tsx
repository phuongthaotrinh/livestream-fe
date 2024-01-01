'use client'
import {Button, Form, FormInstance, Input} from "antd";
import {PasswordVerifyForm} from "@/components/form/password-verify-form";
import * as React from "react";
import {Rule} from "rc-field-form/es/interface";

interface ISignUpForm {
    form: FormInstance<any>,
    onFinish: (value: any) => void,
    rule: Rule,
    isPending: boolean
}
export function SignUpForm({form,onFinish,rule,isPending}:ISignUpForm) {
    return (
        <>
            <Form form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  name="signin_form"
            >
                <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]}
                           required>
                    <Input placeholder="John Doe"/>
                </Form.Item>
                <Form.Item name="name" label="Display Name" className="custom_ant_label" rules={[rule]}
                           required>
                    <Input placeholder="John Doe"/>
                </Form.Item>
                <Form.Item name="fullName" label="Full Name" className="custom_ant_label" rules={[rule]}
                           required>
                    <Input placeholder="John Doe"/>
                </Form.Item>
                <PasswordVerifyForm rule={[rule]}/>
                <Form.Item className=" mt-5">
                    <Button htmlType="submit" type="primary"
                            loading={isPending}
                            className="bg-black block w-full">Submit</Button>
                </Form.Item>
            </Form>

        </>
    )
}