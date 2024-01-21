import Image from "next/image";
import * as React from "react";

export function WhoAmI() {
    return (
        <div className="container">
            <div className="grid md:grid-cols-2 sm:grid-cols-1  gap-6 my-20">
                <div className="background">
                    <Image width={500} height={500} loading="lazy" objectFit="cover" src="/images/graph-jasmine-a.png"
                           alt="graph-jasmine-a"/>
                </div>
                <div className={'content max-w-md '}>
                    <h6 className="relative heading-sm-s2 animated fadeInUp uppercase text-[#16a1ff] my-4
                    before:content-[''] before:absolute before:top-1/2 before:-left-16 ml-16
                    before:h-[2px] before:w-12 before:bg-[#16a1ff]
                    visible delay-[0.2s] ">
                        What is ICO Crypto
                    </h6>
                    <h2 className="text-3xl font-bold max-w-sm text-[#223b55] my-6">
                        We’ve built a platform <br/>
                        to buy and sell shares.
                    </h2>
                    <p className=" text-[1.27rem] leading-7 text-[#6a7894] ">
                        ICO Crypto is a platform for the future of funding that powering dat for the new equity
                        blockchain.
                    </p>
                    <p className="text-[#6a7894] my-8">
                        While existing solutions offer to solve just one problem at a time, our team is up to build a
                        secure, useful, & easy-to-use product based on private blockchain. It will include easy
                        cryptocurrency payments integration, and even a digital arbitration system.
                        <br/><br/>
                        At the end, Our aims to integrate all companies, employees, and business assets into a unified
                        blockchain ecosystem, which will make business truly efficient, transparent, and reliable.
                    </p>
                </div>
            </div>
        </div>
    )
}