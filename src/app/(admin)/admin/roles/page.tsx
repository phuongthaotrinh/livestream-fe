import * as React from "react";
import {RolesPageTemplate} from "@/components/admin/roles/template/role-page-template"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin| Roles & Permissions",
    description: "make streaming easier with us",
}
export default function RolesPage() {

    return (
        <>
            <RolesPageTemplate/>
        </>
    )
};


