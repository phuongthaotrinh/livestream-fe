'use client';

import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import * as React from "react";
import {usePathname, useRouter} from "next/navigation";
import useApiPlatform from "@/_actions/platforms";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {Tag,Space,Popconfirm} from "antd"
import {Button} from "@/components/common/ui/button";
import {useAuth} from "@/lib/hooks/use-auth";
import {RegisterFormShell} from "@/components/shells/register-form-shell";


export default function FormSubmissions() {
    const pathname = usePathname();
    const router = useRouter();
    const {getAllFormsRegister, approveRegisteredPlatform} = useApiPlatform();
    const [isPending, startTransition] = React.useTransition()
    const [data, setData] = React.useState<any[]>([]);
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const {profile} = useAuth()


    const fectchData = () => {
        startTransition(() => {
            toast.promise((getAllFormsRegister()),{
                loading: 'Loading..',
                error:(err:any) => catchError(err),
                success:({data}) => {
                    setData(data)
                    return "get success all register form"
                }
            })
        })
    }

    React.useEffect(() => {
       if(profile)  fectchData()
        if(trigger) fectchData()
    },[profile, trigger]);



    return (
        <>
            <div className="flex items-center justify-between w-full mb-7">
                <PageHeader title="Forms submissions" desc={`all submissions form`}/>
                <ShellAction type="action" actionName="Back" actionVoid={() => router.back()}/>
            </div>
          <RegisterFormShell data={data} setTrigger={setTrigger} isClientMode={false} />


        </>
    )
}