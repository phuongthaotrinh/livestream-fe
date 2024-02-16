import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {RolesTableShell} from '@/components/shells/roles-shell';

export function RolesPageTemplate() {

    return (
        <>
            <PageHeader title="Roles" desc="settings all roles"/>
            <div className="my-6 relative">
                        <RolesTableShell/>
            </div>
        </>
    )
};


