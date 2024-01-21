"use client"
import {PageHeader} from "@/components/common/page-header";
import {NewsTableShell} from "@/components/shells/news-shell";
import * as React from "react";
import {useApiAdditional} from "@/_actions/additional";

export default function NewsPage() {
    const {getNews} = useApiAdditional();
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async () => {
            const {data} = await getNews();
            setData(data)
        })()
    }, [])


    return (
        <div>
            <PageHeader title="News" desc="your news is here"/>
            <div className="my-6">
                <NewsTableShell data={data} pageCount={1}/>
            </div>
        </div>
    )
}