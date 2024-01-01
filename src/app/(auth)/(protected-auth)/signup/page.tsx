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
import {SocicalAuth} from "@/components/root/auth/componnents/socicalAuth";
import {SignUpForm} from "@/components/form/sign-up-form";

export default function Signup() {
    const [isPending, startTransition] = React.useTransition();
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
                            <SocicalAuth />
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>or with email</p>
                            </div>
                            <SignUpForm form={form} onFinish={onFinish} rule={rule} isPending={isPending} />

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