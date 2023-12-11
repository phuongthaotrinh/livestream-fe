'use client'
import {Button, Checkbox, Form, Input, Card} from 'antd';
import {Icons} from "@/components/common/icons"
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {authSigninSchema} from "@/lib/validation/users";


export default function Signin() {
    const [form, rule] = useValidation(authSigninSchema);
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };


    return (
        <div>

            <div className="grid grid-flow-col md:grid-cols-2 sm:grid-cols-1 mt-20">
                <div className="img hidden md:block">
                    <Icons.authBg/>
                </div>
                <div className="form">
                    <div className="w-full  flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community
                                with
                                all time access and free </h1>
                            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                                <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                                    <button type="button"
                                            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                        <Icons.googleColor className="w-4"/>
                                        Sign Up with Google
                                    </button>
                                </div>
                                <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                                    <button type="button"
                                            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                        <Icons.gitHubColor className="w-4"/>
                                        Sign Up with Github
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>or with email</p>
                            </div>
                            <Form form={form}
                                  onFinish={onFinish}
                                  layout="vertical"
                                  name="signin_form"
                            >
                                <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input placeholder="John Doe"/>
                                </Form.Item>
                                <Form.Item name="password" label="Password" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input.Password placeholder="*******"/>
                                </Form.Item>
                                <Form.Item className=" mt-5">
                                    <Button htmlType="submit" type="primary"
                                            className="bg-black block w-full">Submit</Button>
                                </Form.Item>
                            </Form>

                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Already have an account? <a href="/signup" className="text-black hover:underline">Register
                                    here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}