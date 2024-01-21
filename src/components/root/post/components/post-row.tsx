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
                         title={item?.title}
                         onClick={() => router.push(`/post/${item?.id}`)}
                    >
                        <img className="w-full max-h-[194px]"
                             src={item?.image_link}
                             alt="Sunset in the mountains"
                        style={{width: '320px', maxWidth: '320px', objectFit: 'cover'}}

                        />
                        <div className="p-4">
                            <div className="font-bold text-xl mb-2">{item?.title}</div>
                            <p className="text-gray-700 text-base">
                                {item?.preview}
                            </p>
                        </div>
                        <div className="px-4 pt-4 pb-2">
                              Read
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}