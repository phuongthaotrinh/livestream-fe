'use client';

import {Form, Input, Button} from "antd";
import {useValidation} from "@/lib/hooks/use-validation";
import {contactSchema, IContact} from "@/lib/validation/home";
import React from "react";
import {Icons} from '@/components/common/icons'
import toast from "react-hot-toast";
import useApiUsers from "@/_actions/users";

export function Contact() {
    const [form, rule] = useValidation<IContact>(contactSchema);
    const [isPending, startTransition] = React.useTransition();
    const {getUsers} = useApiUsers()


    const onFinish = (values: any) => {
        //change send api
        startTransition(() => {
            toast.promise(
                getUsers(),
                {
                    loading: 'Saving...',
                    success: <b>Settings saved!</b>,
                    error: <b>Could not save.</b>,
                }
            );

        })
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
                <Form name="contact_form" form={form} className="mt-20 w-2/3" layout="vertical" onFinish={onFinish}>
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
                            style={{ height: 100, resize: 'none'  }}
                        />
                    </Form.Item>
                    <Form.Item colon style={{marginTop: '1.5rem'}}>
                        <Button type="primary" htmlType="submit" disabled={isPending}
                                className="bg-black cursor-pointer"
                        >
                            {isPending ? 'Sending...': 'Submit'}
                        </Button>
                    </Form.Item>

                </Form>
            </div>


            <div className="background col-span-1 mt-20">
                <img
                    src="https://wpdemo.vegatheme.com/icos-jasmine/wp-content/uploads/sites/20/2018/07/graph-jasmine-f.png"
                    alt="powerofus" className="w-auto h-auto"/>
            </div>
        </div>
    )
}