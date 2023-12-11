
import {PageHeader} from "@/components/common/page-header";
import {PLatformTableShell} from "@/components/shells/platform-shell";
export default function Platform() {
    return (
        <>
            <PageHeader title="Platforms" desc="your list platform is here"/>
            <div className="my-6">
                <PLatformTableShell data={[]} pageCount={1}/>
            </div>

        </>
    )
}