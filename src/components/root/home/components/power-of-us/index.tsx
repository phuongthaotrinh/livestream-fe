import Image from "next/image";
import * as React from "react";

export function PowerOfUs() {
    return (
        <div className="grid md:grid-cols-2 sm:grid-cols-1   gap-6 my-20">
            <div className="background md:order-1 sm:order-2">
                <Image width={500} height={500} loading="lazy" objectFit="cover" src="/images/graph-jasmine-b.png"
                       alt="graph-jasmine-b"/>
            </div>
            <div className={'content max-w-md '}>
                <h6 className="relative heading-sm-s2 animated fadeInUp uppercase text-[#16a1ff] my-4
                    before:content-[''] before:absolute before:top-1/2 before:-left-16 ml-16
                    before:h-[2px] before:w-12 before:bg-[#16a1ff]
                    visible delay-[0.2s] ">
                    Power of us
                </h6>
                <h2 className="text-3xl font-bold max-w-sm text-[#223b55] my-6">
                    Tokenization Benefits

                </h2>
                <p className="text-[#6a7894] my-8">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                    <br/><br/>
                    Cryptocurrencies are Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    laudantium, totam rem.
                    <br/><br/>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciun quis nostrut.

                </p>
            </div>
        </div>
    )
}