
import {PageHeader} from "@/components/common/page-header";
import {UserTableShell} from "@/components/shells/user-shell";
import * as React from "react";
import {DataTableSkeleton} from "@/components/common/skeleton/table-skeleton";
import {useMounted} from "@/lib/hooks/use-mounted";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Admin| Customers",
    description: "make streaming easier with us",
}
export default function UserPage() {

    return (
        <>
                    <PageHeader title="Users" desc="your list user is here"/>
                    <div className="my-6">
                            <UserTableShell  />
                    </div>
        </>
    )
}