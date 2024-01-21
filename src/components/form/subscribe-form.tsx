import {Form, FormInstance, Input} from "antd";
import React from "react";
import {Rule} from "rc-field-form/es/interface";
import {Isubscribe} from "@/lib/validation/home";

interface ISubscribeForm {
    form:FormInstance<Isubscribe>,
    onFinish:(values:Isubscribe) => void,
    rule:Rule,
    isPending:boolean
}
export function SubscribeForm({form, onFinish, rule,isPending}:ISubscribeForm) {
    const id = React.useId()
    return (
        <>
            <Form onFinish={onFinish} form={form} name={`subscribe_form.${id}`}>
                <label htmlFor="search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <Form.Item rules={[rule]} name="email" className="absolute w-full">
                        <Input
                            placeholder="Enter your email address"
                            className="like_tailwind_input"
                        />
                    </Form.Item>
                    <button disabled={isPending} type="submit"
                            className="text-white absolute end-2.5 bottom-[-2.7rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Subscribe
                    </button>
                </div>
            </Form>

        </>
    )
}