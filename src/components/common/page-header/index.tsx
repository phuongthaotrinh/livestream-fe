'use client'
import { Divider } from 'antd';
interface IPageHeader{
    title:string,
    desc?:string
}

export function PageHeader ({title,desc}:IPageHeader) {
    return (
     <div>
         <div>
             <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
             <p className="text-sm text-muted-foreground">{desc}.</p>
         </div>
         <Divider />
     </div>
    )
}
