

import {AdminLayout} from "@/layouts/admin/layout"
import * as React from "react";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Admin",
    description: "make streaming easier with us",
}
export default function AdminLayoutTemplate({
                                        children,
                                    }: {
    children: React.ReactNode
}) {

    return (
        <>
            <AdminLayout>
                    {children}
            </AdminLayout>
        </>
    )
}