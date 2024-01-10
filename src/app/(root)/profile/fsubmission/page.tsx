'use client';


import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {ShellAction} from "@/components/common/shell-back";
import {BellIcon, PlusCircleIcon} from "lucide-react";
import {Card, Modal} from "antd"
import {SubmissionForm} from "@/components/form/submission-form";
import useApiPlatform from "@/_actions/platforms";
import {usePathname} from "next/navigation"
import {FormsubmissionShell} from "@/components/shells/formsubmission-shell";

export default function ProfileForms() {
    const [data,setData] = React.useState<any[]>([])
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
            {/*<PageHeader title="Forms list" desc="Manage your forms submission"/>*/}
            {/*     <div className="space-y-5">*/}
            {/*         {data ? data.map((item, index) => (*/}
            {/*             <Card key={index} bodyStyle={{padding:'5px'}} className="w-1/2" >*/}
            {/*                 <div className=" flex items-center space-x-4 rounded-md border p-4">*/}
            {/*                     <BellIcon />*/}
            {/*                     <div className="flex-1 space-y-1">*/}
            {/*                         <p className="text-sm font-medium leading-none">*/}
            {/*                             {item.name}*/}
            {/*                         </p>*/}
            {/*                         <p className="text-sm text-muted-foreground">*/}
            {/*                             Send notifications to device.*/}
            {/*                         </p>*/}
            {/*                     </div>*/}
            {/*                     <ShellAction type="link" actionName="create form" icon={PlusCircleIcon}*/}

            {/*                                  href={{*/}
            {/*                                      pathname: `${pathname}/${item.id}`,*/}
            {/*                                      query: {type: JSON.stringify(item.live_type_id, null, 2)},*/}
            {/*                                  }}*/}
            {/*                     />*/}

            {/*                 </div>*/}
            {/*             </Card>*/}
            {/*         )) : (*/}
            {/*             <></>*/}
            {/*         )}*/}
            {/*     </div>*/}

            <FormsubmissionShell page_desc="Manage your forms submission" page_title="Forms list" />
        </>
    )
}