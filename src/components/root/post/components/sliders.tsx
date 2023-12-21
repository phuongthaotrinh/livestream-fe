'use client'


import {ISliders} from "@/lib/validation/sliders";
import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


interface ISlidersProps {
    data: ISliders[]
}

export function Sliders({data}: ISlidersProps) {

    return (
        <>
            <ImageGallery items={data?.map((item) => {
                return {
                    original: item?.image_link,
                    originalClass: "h-[300px]",
                    originalTitle:'news-images',
                    loading:'lazy',
                }

            })}
                          showPlayButton={false}
                          showFullscreenButton={false}
                          showThumbnails={false}
                          autoPlay={true}
                          infinite={true}
                          lazyLoad={true}
                          slideDuration={450}
            />

        </>
    )
}





