'use client'
import {Button, Form, Input} from 'antd';
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {authSigninSchema, IAuthSignin} from "@/lib/validation/users";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import {catchError} from "@/lib/helpers"
import {useAuth} from "@/lib/hooks/use-auth";
import {SocicalAuth} from "@/components/root/auth/componnents/socicalAuth";
import Image from "next/image"
export default function Signin() {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter()
    const [form, rule] = useValidation<IAuthSignin>(authSigninSchema);
    const {signinAction} = useAuth();

    const onFinish =  (values: IAuthSignin) => {
        startTransition(async () => {
            try {
              await signinAction(values)
                toast.success("Login successful.")
                router.push("/")
            } catch (err) {
                catchError(err)
            }
        })
    };
    return (
        <div>

            <div className="grid grid-flow-col md:grid-cols-2 sm:grid-cols-1 mt-20">
                <div className="img hidden md:block">
                    <Image src="/images/signin.jpg" alt="signin_banner"   width={600}
                           height={600} />
                </div>
                <div className="form">
                    <div className="w-full  flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community
                                with
                                all time access and free </h1>
                            <SocicalAuth/>
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