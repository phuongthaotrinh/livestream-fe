'use client';

import {Form, Input, Button} from "antd";
import {useValidation} from "@/lib/hooks/use-validation";
import {subscribeSchema, Isubscribe} from "@/lib/validation/home";
import React from "react";
import {Icons} from '@/components/common/icons'
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";

export function Subscridbe() {
    const [form, rule] = useValidation<Isubscribe>(subscribeSchema);
    const [isPending, startTransition] = React.useTransition();


    const onFinish = (values: any) => {
        console.log('values', values)

    }
    return (
        <>
            <div className="bg-gradient-to-r from-[#2b56f5] to-[#16a1ff] h-52 w-full rounded-md">
                <div className="flex h-full justify-between px-16 items-center">
                    <div className="text-white">
                        <h6 className="text-xl font-semibold">Don’t miss out, Stay updated</h6>
                        <p className="max-w-sm mt-5 text-sm">
                            Sign up for updates and market news. Subscribe to our newsletter and receive update about
                            ICOs and crypto tips.
                        </p>
                    </div>
                    <div className="w-2/4">
                        <Form onFinish={onFinish} form={form}>
                            <label htmlFor="search"
                                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <Form.Item rules={[rule]} name="email" className="absolute w-full">
                                    <Input
                                        placeholder="Enter your email address"
                                        className="like_tailwind_input"
                                    />
                                </Form.Item>
                                <button type="submit"
                                        className="text-white absolute end-2.5 bottom-[-2.7rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Subscribe
                                </button>
                            </div>
                        </Form>

                    </div>
                </div>
            </div>

        </>
    )
}