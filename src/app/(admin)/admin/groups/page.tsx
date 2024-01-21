import {GroupTemplate} from "@/components/admin/groups/template";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin| Groups",
    description: "make streaming easier with us",
}

export default function PageGroups() {
    return (
        <>
            <GroupTemplate/>
        </>
    )
}