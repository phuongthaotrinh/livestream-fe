'use client'

import {useRouter} from "next/navigation"
import {fallbackImg} from "@/lib/constants/fallbackImg";
import useApiSliders from "@/_actions/sliders"
import * as React from "react"
import {Sliders} from "@/components/root/post/components/sliders";
import {PostRow} from "@/components/root/post/components/post-row";
import {ISliders} from "@/lib/validation/sliders";
const datajson = {
    "images": [
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702190128/istockphoto-1400013305-1024x1024_nq31zp.jpg",
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702190137/houses-cheung-3rW1HAakg8g-unsplash_yqmmw7.jpg"
    ],
    "title": "ssdsadasd",
    "content": "<p>sadasd</p><p><br></p><p><strong>dasdadasd</strong></p><p><br></p><ol><li><strong>123124</strong></li><li><strong>123123</strong></li></ol>",
    "status": true
}





export default function PostPage() {
    const arr = new Array(20).fill(JSON.parse(JSON.stringify(datajson)));
    const router = useRouter();
    const {getSliders} = useApiSliders();
    const [data, setData]  = React.useState<ISliders[]>([])
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        (async () => {
            const {data} = await getSliders();
            setData(data)
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
                <Sliders data={data} />
                <PostRow  data={arr}/>
            </div>
        </div>
    )
}