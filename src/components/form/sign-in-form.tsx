'use client'
import {Button, Form, FormInstance, Input} from "antd";
import * as React from "react";
import {Rule} from "rc-field-form/es/interface";

interface ISignInForm {
    form: FormInstance<any>,
    onFinish: (value: any) => void,
    rule: Rule,
    isPending: boolean
}
export function SignInForm ({form,rule, isPending, onFinish}:ISignInForm) {
    return (
        <>
            <Form form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  name="signin_form"
            >
                <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]}
                           required>
                    <Input placeholder="johndoe@gmail.com"/>
                </Form.Item>
                <Form.Item name="password" label="Password" className="custom_ant_label" required>
                    <Input.Password placeholder="*******"/>
                </Form.Item>
                <Form.Item className=" mt-5">
                    <Button htmlType="submit" type="primary"
                            disabled={isPending}
                            className="bg-black block w-full">Submit</Button>
                </Form.Item>
            </Form>

        </>
    )
}