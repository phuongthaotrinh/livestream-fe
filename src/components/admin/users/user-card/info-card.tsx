'use client';


import {ShellAction} from "@/components/common/shell-back";
import {Pencil} from "lucide-react";
import {Card} from "antd";
import * as React from "react";
import {usePathname} from "next/navigation";
import {IDetailUser} from "@/lib/validation/users";

export function InfoCard ({data}:{data:IDetailUser}) {
    const pathname = usePathname();
    if(!data) return <></>
    return (
        <>
            <Card title="Infomation">
                {data && data?.user && (
                    <div className="max-w-xs">
                        <h3 className="text-xl text-gray-900 font-medium leading-8">{data?.user?.fullName || 'NAN'}</h3>
                        <div className=" text-gray-400 text-xs font-semibold">
                            <p>{data?.user?.name || 'NAN'}</p>
                        </div>

                        <table className="text-xs my-3">
                            <tbody>
                            <TableRow label="Address" data={data?.user.address}/>
                            <TableRow label="Phone" data={data?.user.phoneNumber}/>
                            <TableRow label="Email" data={data?.user.email}/>
                            </tbody>
                        </table>
                        <ShellAction flex="start" type="link" key="profile_detail" actionName="Edit profile"
                                     icon={Pencil}
                                     href={{
                                         pathname: `${pathname}/edit`,
                                         query: {data: JSON.stringify(data, null, 2)},
                                     }}
                        />

                    </div>
                )}
            </Card>
        </>
    )
}

export const TableRow = ({label, data}: { label: string, data: any }) => {
    return (
        <tr key={label}>
            <td className="px-2 py-2 text-gray-500 font-semibold">{label}</td>
            <td className="px-2 py-2">{data || "NAN"}</td>
        </tr>
    )
}