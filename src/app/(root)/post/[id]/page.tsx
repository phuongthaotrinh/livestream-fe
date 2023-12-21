'use client';
import {Clock1} from "lucide-react"
import {useRouter} from "next/navigation";

const data = {
    "images": [
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702982830/7744146_u8jb2g.jpg"
    ],
    "title": "ssdsadasd",
    "content": "<p>sadasd</p><p><br></p><p><strong>dasdadasd</strong></p><p><br></p><ol><li><strong>123124</strong></li><li><strong>123123</strong></li></ol>",
    "status": true
}

export default function PostDetail() {
    const dataD = JSON.parse(JSON.stringify(data));
    const relateds = new Array(5).fill(JSON.parse(JSON.stringify(data)));
    const router = useRouter()

    return (
        <div className="container my-12">
            <div className="container text-center space-y-5">
                <h1 className="text-indigo-950 hover:text-indigo-600 font-bold text-6xl uppercase cursor-pointer">
                    {dataD.title}
                </h1>
                <div className="grid place-items-center space-y-2">
                    <small className="text-sm text-slate-500"> Create by aadmin</small>
                    <small className="text-sm text-slate-500 flex gap-2">
                        <Clock1 className="w-4"/> <span>Create at 21/09/2023</span>
                    </small>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-4">
                <div id="content" className="col-span-3">
                    <div id="images">
                        <img src={dataD.images[0]} alt=""/>
                    </div>
                    <div className="post_content">
                        <div dangerouslySetInnerHTML={{__html: dataD.content}}>

                        </div>
                    </div>
                </div>

                <div id="related">
                    <div>
                        <h3 className="text-indigo-950 hover:text-indigo-600 font-bold text-xl uppercase cursor-pointer">BV tương tự</h3>
                    </div>
                    <div className="grid p-2 gap-y-4">
                        {relateds.map((item, index) => (
                            <div className="overflow-hidden shadow-lg cursor-pointer" key={index}
                                 title={item.title}
                                 onClick={() => router.push(`/post/${item.title}-${index}`)}
                            >
                                <div className="flex">
                                    <img className="w-28 h-auto"  src={dataD.images[0]} alt="Sunset in the mountains" />
                                    <div className="px-2">
                                        <div className="font-bold text-base mb-1">{item.title}-{index}</div>
                                        <span className="text-gray-700 text-xs">
                                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet..
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