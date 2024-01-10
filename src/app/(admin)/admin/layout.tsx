'use client';

import {AdminLayout} from "@/layouts/admin/layout"
import {PlatformProviders} from "@/lib/context/PlatformProvider";
import * as React from "react";

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