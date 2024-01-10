'use client';

import {PageHeader} from "@/components/common/page-header";
import {PLatformTableShell} from "@/components/shells/platform-shell";
import React from 'react';
import {Card} from "antd";
import {LiveStreamTypeShell} from "@/components/shells/live-stream-type-shell";
import {usePlatform} from "@/lib/hooks/use-platform";

export default function Platform() {
    const {platforms, liveStreamTypeData, setTrigger} = usePlatform()
    return (
        <>

            <PageHeader title="Platforms & livestream types"
                        desc="setting platforms and livestream types"/>
            <div className="my-6 space-y-6">
                <Card title="Platform">
                    <PLatformTableShell data={platforms} pageCount={1} setTrigger={setTrigger}/>
                </Card>
                <Card title="Livestream types">
                    <LiveStreamTypeShell data={liveStreamTypeData} setTrigger={setTrigger}/>
                </Card>
            </div>

        </>
    )
}