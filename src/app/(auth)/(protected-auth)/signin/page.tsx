'use client'
import {Button, Form, Input} from 'antd';
import {Icons} from "@/components/common/icons"
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {authSigninSchema, IAuthSignin} from "@/lib/validation/users";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import {catchError} from "@/lib/helpers"
import {useAuth} from "@/lib/hooks/use-auth";
import useApiUsers from "@/_actions/users";
import {SignInForm} from "@/components/form/sign-in-form";
import {SocicalAuth} from "@/components/root/auth/componnents/socicalAuth";
export default function Signin() {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter()
    const [form, rule] = useValidation<IAuthSignin>(authSigninSchema);
    const {getUser} = useApiUsers();
    const {signinAction} = useAuth();

    const onFinish = async (values: IAuthSignin) => {
        startTransition( () => {
            toast.promise((signinAction(values)),{
                loading: 'SignIn',
                success:() => {
                    router.push('/');
                    return "Login success!"
                },
                error:(error) => catchError(error)
            })
        })
    };
    return (
        <div>

            <div className="grid grid-flow-col md:grid-cols-2 sm:grid-cols-1 mt-20">
                <div className="img hidden md:block">
                    <img src="https://res.cloudinary.com/dr9ebt5bg/image/upload/v1703064075/5098293_jqrqbx.jpg" alt=""/>
                </div>
                <div className="form">
                    <div className="w-full  flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community
                                with
                                all time access and free </h1>
                            <SocicalAuth />
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>or with email</p>
                            </div>
                            <SignInForm form={form} onFinish={onFinish} rule={rule} isPending={isPending} />
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