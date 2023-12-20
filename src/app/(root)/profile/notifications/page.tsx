'use client'
import * as React from "react";
import {PageHeader} from "@/components/common/page-header";
import {Segmented} from 'antd';
import {Bell, BellDot, LayoutGrid} from "lucide-react"

export default function Notification() {
    const [value, setValue] = React.useState<string | number>('All');
    return (
        <>
            <PageHeader title="Notifications" desc="Manage your notifications settings"/>
            <div>
              <div className=" ">
                <div className="">
                    <Segmented
                               options={[
                                   { value: 'All', icon: <LayoutGrid className="w-4"/>,label:'All' },
                                   { value: 'New', icon: <BellDot className="w-4"/>,label:'New' },
                                   { value: 'Read', icon: <Bell className="w-4"/>,label:'Read' },
                               ]}
                               className="custom_ant_segmented"
                               onChange={setValue}
                    />
                </div>
              </div>
                <div className="render mt-4">
                    {value === 'All' && (
                        <> <LayoutGrid /></>
                    )}

                    {value === 'New' && (
                        <> <BellDot /></>
                    )}

                    {value === 'Read' && (
                        <> <Bell /></>
                    )}
                </div>
            </div>
        </>
    )
}