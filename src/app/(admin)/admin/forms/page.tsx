'use client';

import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import {BellIcon, PlusCircle, FolderIcon} from "lucide-react"
import {usePathname, useRouter} from "next/navigation";
import * as React from "react";
import {FormsubmissionShell} from "@/components/shells/formsubmission-shell";


export default function PlatformFormsPage () {
    const pathname = usePathname();
    const router = useRouter()
    return (
        <>

            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Danh sách forms" desc={`list of form`}/>
            </div>

            <div className="flex gap-4">
                <ShellAction actionName="Tạo forms" flex="start" icon={PlusCircle} href={`${pathname}/create`} />
            </div>
            <FormsubmissionShell page_title="" page_desc="" isClientMode={false}/>
        </>
    )
}