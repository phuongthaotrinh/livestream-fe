'use client';

import {useValidation} from "@/lib/hooks/use-validation";
import {contactSchema, IContact} from "@/lib/validation/home";
import React from "react";
import {Icons} from '@/components/common/icons'
import toast from "react-hot-toast";
import Image from "next/image";
import {ContactForm} from "@/components/form/contact-form";

export function Contact() {
    const [form, rule] = useValidation<IContact>(contactSchema);
    const [isPending, startTransition] = React.useTransition();

    const onFinish = (values: any) => {
      toast.error('feature is not enable');
      form.resetFields()
    }
    return (
        <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-3 my-20">
            <div className={'content col-span-2'}>
                <h6 className="custom_text_before">
                    CONTACT
                </h6>
                <h2 className="text-3xl font-bold max-w-sm text-[#223b55] my-6">
                    Get In Touch

                </h2>
                <div className="text-[#6a7894] my-8 max-w-xs">
                    <p className="w-10/12">
                        Any question? Reach out to us and we’ll get back to you shortly.
                    </p>
                    <div className={"space-y-4 mt-4"}>
                        <div className="flex items-center gap-2">
                            <Icons.phoneCircleColorRegualar className="w-10 h-10"/>
                            +44 0123 4567
                        </div>
                        <div className="flex items-center gap-2">
                            <Icons.mailCircleColorRegualar className="w-10 h-10"/>
                            mailinfo@yourcompany.com
                        </div>
                        <div className="flex items-center gap-2">
                            <Icons.facebookCircleColorRegualar className="w-10  h-10"/>
                            Join us on Facebook
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-span-2 ">
                <ContactForm form={form} onFinish={onFinish} rule={rule} isPending={isPending}/>
            </div>


            <div className="background col-span-1 mt-20">
                <Image width={500} height={500} loading="lazy" objectFit="cover" src="/images/graph-jasmine-f.png"
                       alt="graph-jasmine-f"/>
            </div>
        </div>
    )
}