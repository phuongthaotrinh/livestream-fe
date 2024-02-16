import {PageHeader} from "@/components/common/page-header";
import {FormsubmissionShell} from "@/components/shells/formsubmission-shell";
import {Metadata} from "next";
import {ShellAction} from "@/components/common/shell-back";
import * as React from "react";
export const metadata: Metadata = {
    title: "Admin| Forms Template",
    description: "make streaming easier with us",
}
export default function PlatformFormsPage () {
    return (
        <>
            <div className="flex items-center justify-between w-full mb-7">
                <PageHeader title="Danh sách forms" desc={`list of form`}/>
            </div>
            <FormsubmissionShell page_title="" page_desc="" isClientMode={false}/>
        </>
    )
}