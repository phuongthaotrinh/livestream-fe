'use client'

import * as React from "react";
import useApiPlatform from "@/_actions/platforms";
import {usePathname} from "next/navigation";
import {PageHeader} from "@/components/common/page-header";
import {Card} from "antd";
import {BellIcon, PlusCircleIcon} from "lucide-react";
import {ShellAction} from "@/components/common/shell-back";

interface IFormsubmissionShell {
    page_title:string,
    page_desc:string
}
export function FormsubmissionShell ({page_title, page_desc}:IFormsubmissionShell) {
    const [data,setData] = React.useState<any[]>([]);

    const {getAllForms} = useApiPlatform();
    const pathname = usePathname()


    React.useEffect(() => {
        (async () => {
            const {data} =await getAllForms();
            setData(data)
        })()

    },[]);
    return (
        <>
            <PageHeader title={page_title} desc={page_desc}/>
            <div className="space-y-5 w-full">
                {data ? data.map((item, index) => (
                    <Card key={index} bodyStyle={{padding:'5px'}} className="w-full" >
                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                            <BellIcon />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.name}
                                </p>

                            </div>
                           <div className="max-w-[150px]">
                               <ShellAction  type="link" actionName="create submission" icon={PlusCircleIcon}
                                             href={{
                                                 pathname: `${pathname}/${item.id}`,
                                                 query: {type: JSON.stringify(item.live_type_id, null, 2)},
                                             }}
                               />
                           </div>

                        </div>
                    </Card>
                )) : (
                    <></>
                )}
            </div>

        </>
    )
}