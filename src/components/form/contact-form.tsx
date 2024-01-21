'use client'

import {Button, Form, FormInstance, Input} from "antd";
import React from "react";
import {IContact } from "@/lib/validation/home";
import {Rule} from "rc-field-form/es/interface";

interface IContactForm {
    form: FormInstance<IContact>,
    onFinish: (values: IContact) => void,
    rule: Rule,
    isPending: boolean
}

export function ContactForm({form, rule, isPending, onFinish}: IContactForm) {
    const id = React.useId()
    return (
        <>
            <Form name={`contact_form.${id}`} form={form} className="mt-20 w-2/3" layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" className="custom_ant_label" rules={[rule]}>
                    <Input placeholder="Your name" className="like_tailwind_input_small"/>
                </Form.Item>
                <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]}>
                    <Input placeholder="Your name"
                           className="like_tailwind_input_small"
                    />
                </Form.Item>
                <Form.Item name="message" label="Message" className="custom_ant_label" rules={[rule]}>
                    <Input.TextArea
                        showCount
                        maxLength={100}
                        placeholder="Your message"
                        style={{height: 100, resize: 'none'}}
                    />
                </Form.Item>
                <Form.Item colon style={{marginTop: '1.5rem'}}>
                    <Button type="primary" htmlType="submit" disabled={isPending}
                            className="bg-black cursor-pointer"
                    >
                        {isPending ? 'Sending...' : 'Submit'}
                    </Button>
                </Form.Item>

            </Form>

        </>
    )
}