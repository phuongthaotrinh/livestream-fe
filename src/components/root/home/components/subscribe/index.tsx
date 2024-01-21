'use client';

import {useValidation} from "@/lib/hooks/use-validation";
import {subscribeSchema, Isubscribe} from "@/lib/validation/home";
import React from "react";
import toast from "react-hot-toast";
import {SubscribeForm} from "@/components/form/subscribe-form";

export function Subscridbe() {
    const [form, rule] = useValidation<Isubscribe>(subscribeSchema);
    const [isPending, startTransition] = React.useTransition();


    const onFinish = (values: any) => {
        toast.error('feature is not enable');
        form.resetFields()

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
                        <SubscribeForm form={form}  rule={rule} onFinish={onFinish} isPending={isPending}/>

                    </div>
                </div>
            </div>

        </>
    )
}