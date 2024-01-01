'use client';
import {Clock1} from "lucide-react"
import {useParams, useRouter} from "next/navigation";
import * as React from "react";
import {useApiAdditional} from "@/_actions/additional";
import {INews} from "@/lib/validation/news";

const URL = 'https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702982830/7744146_u8jb2g.jpg'

export default function PostDetail() {
    const {id} = useParams();
    const {getNews} = useApiAdditional();
    const router = useRouter();
    const [data, setData] = React.useState<INews | undefined>(undefined)
    const [relateds, setRelateds] = React.useState<INews[] | undefined>(undefined)

    React.useEffect(() => {
        (async () => {
            const {data} = await getNews();
            const res = data?.find((item: any) => item?.id == id);
            const relateds = data?.filter((item: any) => item?.id === id);
            setData(res);
            setRelateds(relateds)
        })()
    }, [id]);
    return (
        <div className="container my-12">
            <div className="container text-center space-y-5">
                <h1 className="text-indigo-950 hover:text-indigo-600 font-bold text-6xl uppercase cursor-pointer">
                    {data?.title}
                </h1>
                <div className="grid place-items-center space-y-2">
                    <small className="text-sm text-slate-500"> Create by aadmin</small>
                    <small className="text-sm text-slate-500 flex gap-2">
                        <Clock1 className="w-4"/> <span>Create at 21/09/2023</span>
                    </small>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-6">
                <div id="content" className="col-span-3">
                    <div id="images">
                        <img src={data?.image_link} alt="" className="max-h-96 w-full object-cover"/>
                    </div>
                    <div className="post_content my-12">
                        <div className="container float-left post_content_content">
                            <div dangerouslySetInnerHTML={{__html: data?.content}}>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="related">
                    <div>
                        <h3 className="text-indigo-950 hover:text-indigo-600 font-bold text-xl uppercase cursor-pointer">BV
                            tương tự</h3>
                    </div>
                    <div className="grid p-2 gap-y-4 bg-gray-300 h-auto min-h-12">
                        {relateds && relateds.map((item, index) => (
                            <div className="overflow-hidden shadow-lg cursor-pointer" key={index}
                                 title={item?.title}
                                 onClick={() => router.push(`/post/${item?.id}`)}
                            >
                                <div className="flex">
                                    <img className="w-28 h-auto" src={data?.image_link || URL}
                                         alt={item?.title}/>
                                    <div className="px-2">
                                        <div className="font-bold text-base mb-1">{item?.title}</div>
                                        <span className="text-gray-700 text-xs">
                                            {item?.preview}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}