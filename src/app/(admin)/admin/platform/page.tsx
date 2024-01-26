import {PageHeader} from "@/components/common/page-header";
import {PLatformTableShell} from "@/components/shells/platform-shell";
import {LiveStreamTypeShell} from "@/components/shells/live-stream-type-shell";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin| Platforms",
    description: "make streaming easier with us",
}
export default function Platform() {
    return (
        <>

            <PageHeader title="Platforms & livestream types"
                        desc="setting platforms and livestream types"/>
            <div className="my-6 space-y-6">
                    <PLatformTableShell/>
                    <LiveStreamTypeShell/>
            </div>

        </>
    )
}