import {PageHeader} from "@/components/common/page-header";
import {NewsTableShell} from "@/components/shells/news-shell";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Admin| News",
    description: "make streaming easier with us",
}
export default function NewsPage() {
    return (
        <div>
            <PageHeader title="News" desc="your news is here"/>
            <div className="my-6">
                <NewsTableShell />
            </div>
        </div>
    )
}