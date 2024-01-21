'use client';

import * as React from "react";
import {Space, Card} from "antd";
import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import {useRouter} from "next/navigation";
import {TableRow} from "@/components/admin/users/user-card/info-card"
import {catchError} from "@/lib/helpers";
import {useApiAdditional} from "@/_actions/additional";
import {toast} from "react-hot-toast";
interface IParams extends React.PropsWithChildren {
    params: {
        id: string
    }
}

export default function DetailGroup({params}:IParams){
    const [isPending, startTransition] = React.useState<any>();
    const [data, setData] = React.useState<any>()
    const router = useRouter();
    const {getGroup} = useApiAdditional();


    React.useEffect(() => {
        startTransition(() => {
            toast.promise((getGroup(Number(params.id))), {
                loading: 'loading',
                success: (data) => {
                    setData(data)
                    return 'Get groups successfully!'
                },
                error: (err) => catchError(err)
            })
        })
    },[params.id])
    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Group Detail" desc={`Group id: ${params.id}`}/>
                <ShellAction type="action"  actionVoid={() => router.back()} actionName="Back"/>
            </Space>
            <div>
                <Card title="Infomation">

                        <div className="max-w-xs">
                            <h3 className="text-xl text-gray-900 font-medium leading-8 uppercase">{data?.group?.name || 'NAN'}</h3>
                            <div className=" text-gray-400 text-xs font-semibold">
                                <p>Creator: {data?.user.email || 'NAN'} </p>
                            </div>

                            <table className="text-xs my-3">
                                <tbody>
                                <TableRow label="Group name" data={data?.group?.name}/>
                                <TableRow label="Phone" data={'data?.user.phoneNumber'}/>
                                <TableRow label="Email" data={'data?.user.email'}/>
                                </tbody>
                            </table>
                        </div>

                </Card>
            </div>
        </>
    )
}