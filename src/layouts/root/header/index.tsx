'use client'
import React, {useEffect, useMemo, useRef, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {
    type Container
} from "@tsparticles/engine";
import {options} from '@/lib/themes/tsparticles-options';
import {loadFull} from "tsparticles";
import {Engine} from "@tsparticles/engine";
import Text3d from "@/layouts/root/header/components/text3d";
import clsx from "clsx";
import Link from "next/link";
import Index from "@/layouts/root/header/components/user-nav";
import {Grid, Divider} from "antd";
import {useGetLastPath} from "@/lib/helpers";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect"

export const Header = () => {
    const [init, setInit] = useState(false);
    const isHome = useGetLastPath();

    useIsomorphicLayoutEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {

    };

    const memoizedOptions = useMemo(() => options, []);
    const plane = useRef<HTMLDivElement>(null);
    const maxRotate = 45;

    const manageMouseMove = (e: React.MouseEvent) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const perspective = window.innerWidth * 4;
        const rotateX = maxRotate * x - maxRotate / 2;
        const rotateY = (maxRotate * y - maxRotate / 2) * -1;
        if (plane.current) {
            plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
        }
    };
    const {xs, sm} = Grid.useBreakpoint();
    const words = ['Make', 'Streaming', 'Easier', 'With', 'Us'];
    if (init) {
        return (
            <>
                {isHome === "" ? (
                    <>
                       <div className="absolute top-0">
                           <Particles
                               id="tsparticles"
                               particlesLoaded={particlesLoaded}
                               options={memoizedOptions}
                           />
                       </div>
                        <div
                            className={'text-black grid md:grid-cols-2 sm:grid-cols-1 container h-screen max-h-screen'}>

                            {/*text 3d*/}
                            <div onMouseMove={(e) => manageMouseMove(e)}
                                 className={'container_page'}
                            >
                                <div ref={plane} className={'body_page'}>
                                    {words.map((item, index) => (
                                        <Text3d key={index} primary={item} secondary={item}/>
                                    ))}
                                </div>
                            </div>

                            {/*images  and menu*/}
                            <div className={clsx("mt-12", {
                                'hidden': xs,
                                'block': !xs
                            })}>
                                <div className=" w-full p-2 flex justify-end ">
                                    <div className="flex items-center gap-4">
                                        <Link href="/">Home</Link>
                                        <Link href="/post">News</Link>
                                        <Index/>
                                    </div>
                                </div>
                                <div className={"absolute top-30 "}>
                                    <img
                                        src="https://res.cloudinary.com/dr9ebt5bg/image/upload/v1703142379/13454203_5263607-removebg-preview_hk8mi0.png"
                                        alt=""/>
                                </div>
                            </div>

                            {/*<div className={clsx({*/}
                            {/*    'block order-1': xs,*/}
                            {/*    'hidden': !xs*/}
                            {/*})}>*/}
                            {/*    bugger menu*/}
                            {/*</div>*/}
                        </div>

                    </>
                ) : (
                    <>
                        <div className="mb-12 border border-b-slate-200 ">
                            <div className="container">
                                <div className=" w-full p-2 flex justify-between">
                                    <div>
                                        <Link href="/">
                                            <img
                                                src="https://wpdemo.vegatheme.com/icos-jasmine/wp-content/uploads/sites/20/2018/06/logo-dark-big.png"
                                                alt=""/>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Link href="/">Home</Link>
                                        <Link href="/post">News</Link>
                                        <Index/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>

        );
    }

    return null;
};