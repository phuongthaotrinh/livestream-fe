'use client';

import {AdminLayout} from "@/layouts/admin/layout"

export default function AdminLayoutTemplate({
                                        children,
                                    }: {
    children: React.ReactNode
}) {

    return (
        <>
            <AdminLayout>{children}</AdminLayout>
        </>
    )
}