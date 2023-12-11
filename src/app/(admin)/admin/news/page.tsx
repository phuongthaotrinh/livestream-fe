
import {PageHeader} from "@/components/common/page-header";
import { NewsTableShell} from "@/components/shells/news-shell"

export default function UserPage() {

    return (
        <div>
            <PageHeader title="News" desc="your news is here"/>
            <div className="my-6">
                <NewsTableShell data={[]} pageCount={1}/>
            </div>
        </div>
    )
}