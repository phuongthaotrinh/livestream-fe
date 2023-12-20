'use client'

import {PageHeader} from "@/components/common/page-header";
import {useAuth} from "@/lib/hooks/use-auth";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import {Plus, Edit, Users} from "lucide-react";
import * as React from "react";
import type {CollapseProps} from 'antd';
import {Collapse, Tag, Avatar, Card} from 'antd';
import Link from "next/link"
import {toast} from "react-hot-toast";
import {Button} from "@/components/common/ui/button";

export default function AccountPage() {
    const {profile} = useAuth();
    if (!profile) return null;


    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className="flex items-center gap-6">
                <span>{profile?.email}</span>
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

    const openDialogProfile = () => {
        toast.success('open dialog here')
    }

    return (
        <>
            <PageHeader title="Account" desc="Manage your account settings"/>
            <div className="content my-5 space-y-8">
                <section className="flex items-center gap-6">
                    <Avatar size={64}
                            src={profile?.images ? profile?.images : fallbackImg}
                            srcSet={profile?.images ? profile?.images : fallbackImg}/>
                    <div className="flex flex-col">
                        <span> {profile?.name}</span>
                        <small> {profile?.fullName}</small>
                    </div>
                    <div className="md:ml-8">
                        <Button
                            onClick={openDialogProfile}

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

                {/*check if role !== admin => disable this section */}
                <section>
                    <h3 className="font-semibold text-xl">Your Groups</h3>
                    <small>All yours group you manager is here </small>

                    {/*If you have at least 1 group*/}
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <Card bodyStyle={{padding: '10px'}}>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-xl ">Group 1</h3>
                                <p className="flex items-center font-semibold "><Users
                                    className="mr-2 w-4"/>125 members</p>
                               <div className="flex justify-between items-center">
                                   <Button variant="secondary" color="text-[#103fef]">
                                       Watch members
                                   </Button>
                                   <p className="mt-2 text-sm">
                                       Create at: 21/09/2023 <br/>
                                       Lasted at: 20/12/2023
                                   </p>
                               </div>
                            </div>
                        </Card>
                    </div>

                </section>
            </div>
        </>
    )
}
