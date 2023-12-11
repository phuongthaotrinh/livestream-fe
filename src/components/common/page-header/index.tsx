'use client'
import { Typography } from 'antd';

interface IPageHeader{
    title:string,
    desc?:string
}

export function PageHeader ({title,desc}:IPageHeader) {
    return (
        <div>
            <h1 className="scroll-m-20 p-0 m-0 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground p-0 m-0">{desc}.</p>
        </div>
    )
}
