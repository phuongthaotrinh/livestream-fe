'use client'

import {useApiAdditional} from "@/_actions/additional"
import * as React from "react"
import {Sliders} from "@/components/root/post/components/sliders";
import {PostRow} from "@/components/root/post/components/post-row";
import {ISliders} from "@/lib/validation/sliders";
import {INews} from "@/lib/validation/news";


export default function PostPage() {

    const {getSliders, getNews} = useApiAdditional();
    const [sliders, setSliders]  = React.useState<ISliders[]>([]);
    const [news, setNews]  = React.useState<INews[]>([]);
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        (async () => {
           await Promise.all([getSliders(), getNews()]).then(([{data:sliders},{data:news}]) => {
               setSliders(sliders);
               setNews(news)
           })
        })()
    },[])


    return (
        <div className="container my-12">
            <div className="container text-center">
                <h1 className="text-indigo-950 hover:text-indigo-600 font-bold text-6xl  uppercase cursor-pointer">
                    Post Page
                </h1>
            </div>
            <div className="space-y-6 mt-10">
                <Sliders data={sliders} />
                <PostRow  data={news}/>
            </div>
        </div>
    )
}