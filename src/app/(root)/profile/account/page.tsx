'use client'

import {PageHeader} from "@/components/common/page-header";
import {useAuth} from "@/lib/hooks/use-auth";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import {Plus, Edit, Users} from "lucide-react";
import * as React from "react";
import type {CollapseProps} from 'antd';
import {Collapse, Tag, Avatar, Card, Modal} from 'antd';
import Link from "next/link"
import {toast} from "react-hot-toast";
import {Button} from "@/components/common/ui/button";
import {useRouter} from "next/navigation"

export default function AccountPage() {
    const router = useRouter();
    const {profile} = useAuth();
    if (!profile) return null;

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className="flex items-center gap-6">
                <span>{profile?.user?.email}</span>
                <Tag color="blue">Primary</Tag>

            </div>,
            children: <section className="space-y-4">
                <div>
                    <p className="font-semibold">Primary email address</p>
                    <small>This email address is the primary email address</small>
                </div>
                <div>
                    <p className="font-semibold">Remove</p>
                    <small>Delete this email address and remove it from your account</small>
                    <p className="text-red-600 hover:underline cursor-pointer text-sm mt-1.5" onClick={() => {
                        toast.error('You can not remove this email!')
                    }}>Remove email address</p>
                </div>
            </section>,
        },
    ];

    return (
        <>
            <PageHeader title="Account" desc="Manage your account settings"/>
            <div className="content my-5 mb-12 space-y-8">
                <section className="flex items-center gap-6">
                    <Avatar size={64}
                            src={profile?.user?.images ? profile?.user?.images?.[0] : fallbackImg}
                            srcSet={profile?.user?.images ? profile?.user?.images?.[0] : fallbackImg}/>
                    <div className="flex flex-col">
                        <span> {profile?.user?.name}</span>
                        <small> {profile?.user?.fullName}</small>
                    </div>
                    <div className="md:ml-8">
                        <Button
                            onClick={() => router.push('/profile/account/edit')}
                            aria-label="Open menu"
                            variant="ghost"
                        >
                            <Edit className="h-4 w-4 mr-2" aria-hidden="true"/>
                            Edit Profile
                        </Button>
                    </div>
                </section>

                <section>
                    <h3 className="font-semibold text-xl">Email Address</h3>
                    <div className="md:w-1/2 space-y-4">
                        <Collapse bordered={false} expandIconPosition={"end"} items={items}/>
                        <Link href="#" className=" text-[#103fef] flex items-center gap-4">
                            <Plus className="w-4"/>
                            <small onClick={() => {
                                toast.error('That feature not enable')
                            }}>Add an email address</small>
                        </Link>
                    </div>
                </section>

                <section>
                    <h3 className="font-semibold text-xl">Change Password</h3>

                    <div className="md:w-1/2 space-y-4">
                        <Link href="#" className=" text-[#103fe0] flex items-center gap-4 mt-2">
                            <small onClick={() => {
                                toast.error('That feature not enable')
                            }}>Change Password</small>
                        </Link>
                    </div>
                </section>


                {/*check if role !== admin => disable this section */}

            </div>
        </>
    )
}
