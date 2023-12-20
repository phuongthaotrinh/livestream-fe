'use client'
import {Button, Form, Input} from 'antd';
import {Icons} from "@/components/common/icons"
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {authSignupSchema, IAuthSignup} from "@/lib/validation/users";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import {catchError} from "@/lib/helpers"
import {useAuth} from "@/lib/hooks/use-auth";

export default function Signup() {
    const [pending, startTransition] = React.useTransition();
    const router = useRouter()
    const {signupAction} = useAuth();

    const [form, rule] = useValidation<IAuthSignup>(authSignupSchema);

    const onFinish = async (values: IAuthSignup) => {
        startTransition(async () => {
            try {
                await signupAction({...values})
                toast.success("Register successful.")
                router.push("/signin")
            } catch (err) {
                catchError(err)
            }
        })
    };

    return (
        <div>

            <div className="grid grid-flow-col md:grid-cols-2 sm:grid-cols-1 mt-20">
                <div className="img hidden md:block">
                    <img src="https://res.cloudinary.com/dr9ebt5bg/image/upload/v1703064355/signup_lnkztv.jpg" alt=""/>

                </div>
                <div className="form">
                    <div className="w-full bg-gray-100  flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
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
                                <Form.Item name="name" label="Display Name" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input placeholder="John Doe"/>
                                </Form.Item>
                                <Form.Item name="fullName" label="Full Name" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input placeholder="John Doe"/>
                                </Form.Item>
                                <Form.Item name="password" label="Password" className="custom_ant_label" rules={[rule]}
                                           hasFeedback
                                           required>
                                    <Input.Password placeholder="*******"/>
                                </Form.Item>
                                <Form.Item name="verifyPassword" label="Confirm Password" className="custom_ant_label"
                                           dependencies={['password']} hasFeedback
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Please confirm your password!',
                                               },
                                               ({getFieldValue}) => ({
                                                   validator(_, value) {
                                                       if (!value || getFieldValue('password') === value) {
                                                           return Promise.resolve();
                                                       }
                                                       return Promise.reject(new Error('The new password that you entered do not match!'));
                                                   },
                                               }),
                                           ]}>
                                    <Input.Password placeholder="*******"/>
                                </Form.Item>
                                <Form.Item className=" mt-5">
                                    <Button htmlType="submit" type="primary"
                                            disabled={pending}
                                            className="bg-black block w-full">Submit</Button>
                                </Form.Item>
                            </Form>

                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Have an account? <a href="/signin" className="text-black hover:underline">Login
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