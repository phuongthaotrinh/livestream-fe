'use client'
import {Typography} from "antd";
import {useRouter} from "next/navigation"
const data = {
    "images": [
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702190128/istockphoto-1400013305-1024x1024_nq31zp.jpg",
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702190137/houses-cheung-3rW1HAakg8g-unsplash_yqmmw7.jpg"
    ],
    "title": "ssdsadasd",
    "content": "<p>sadasd</p><p><br></p><p><strong>dasdadasd</strong></p><p><br></p><ol><li><strong>123124</strong></li><li><strong>123123</strong></li></ol>",
    "status": true
}
export default function PostPage() {
    const arr = new Array(20).fill(JSON.parse(JSON.stringify(data)));
    const router = useRouter()
    return (
        <div className="container my-12">
            <div className="container text-center">
                <h1 className="text-indigo-950 hover:text-indigo-600 font-bold text-6xl uppercase cursor-pointer">
                    Post Page
                </h1>
            </div>
            <div className="space-y-6 mt-10">
                <div className="flex items-center gap-4 flex-wrap">
                    {arr.map((item, index) => (
                        <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer" key={index}
                             title={item.title}
                             onClick={() => router.push(`/post/${item.title}-${index}`)}
                        >
                            <img className="w-full" src="https://res.cloudinary.com/dr9ebt5bg/image/upload/v1702190128/istockphoto-1400013305-1024x1024_nq31zp.jpg" alt="Sunset in the mountains" />
                            <div className="p-4">
                                <div className="font-bold text-xl mb-2">{item.title}-{index}</div>
                                <p className="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                </p>
                            </div>
                            <div className="px-4 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}