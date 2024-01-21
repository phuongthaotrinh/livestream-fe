import Image from "next/image";
import React from "react";

export function Community() {
    return (
        <div className="grid md:grid-cols-2 sm:grid-cols-1   gap-6 my-20">
            <div className="background">
                <Image width={500} height={500} loading="lazy" objectFit="cover" src="/images/graph-jasmine-c.png"
                       alt="graph-jasmine-c"/>
            </div>
            <div className={'content max-w-md '}>
                <h6 className="relative heading-sm-s2 animated fadeInUp uppercase text-[#16a1ff] my-4
                    before:content-[''] before:absolute before:top-1/2 before:-left-16 ml-16
                    before:h-[2px] before:w-12 before:bg-[#16a1ff]
                    visible delay-[0.2s] ">
                    GLOGAL COMMUNITY
                </h6>
                <h2 className="text-3xl font-bold max-w-sm text-[#223b55] my-6">
                    The ICO Community
                </h2>
                <p className="text-[#6a7894] my-8">
                    Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip.
                    <br/><br/>
                    Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.

                </p>
            </div>
        </div>
    )
}