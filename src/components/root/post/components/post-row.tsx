'use client'

import * as React from "react";
import {useRouter} from "next/navigation";
import {INews} from "@/lib/validation/news";


interface IPostRow {
    data:INews[]
}
export function PostRow ({data}:IPostRow) {
    const router  = useRouter()
    return (
        <>
            <div className="flex items-center gap-4 flex-wrap">
                {data.map((item, index) => (
                    <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer" key={index}
                         title={item.title}
                         onClick={() => router.push(`/post/${item.title}-${index}`)}
                    >
                        <img className="w-full max-h-[194px]"
                             src={'https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702982830/7744146_u8jb2g.jpg'}
                             alt="Sunset in the mountains"/>
                        <div className="p-4">
                            <div className="font-bold text-xl mb-2">{item.title}-{index}</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
                                Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div className="px-4 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}