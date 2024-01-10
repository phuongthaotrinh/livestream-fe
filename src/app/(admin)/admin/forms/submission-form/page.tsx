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
import {fallbackImg} from "@/lib/constants/fallbackImg";
import Link from "next/link";
import {Tag} from "antd"
import {Button} from "@/components/common/ui/button"
export default function FormSubmissions() {
    const pathname = usePathname();
    const router = useRouter();
    const {getAllFormsRegister} = useApiPlatform();
    const [isPending, startTransition] = React.useTransition()
    const [data, setData] = React.useState<any[]>([]);
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])



    React.useEffect(() => {
        startTransition(() => {
            toast.promise((getAllFormsRegister()),{
                loading: 'Loading..',
                error:(err:any) => catchError(err),
                success:({data}) => {
                    console.log('data', data);
                    setData(data)
                    return "get success all register form"
                }
            })
        })
    },[])

    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => {
                    const isCheck = table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                    return (
                        <Checkbox
                            checked={selectedRowIds.length > 0 ? isCheck : false}
                            onCheckedChange={(value) => {
                                table.toggleAllPageRowsSelected(!!value);
                                setSelectedRowIds && setSelectedRowIds((prev: any) =>
                                    prev.length === data.length ? [] : data.map((row: any) => row.id)
                                )
                            }}
                            aria-label="Select all"
                            className="translate-y-[2px]"
                        />
                    )
                },
                cell: ({row}) => {
                    const isCheck = row.getIsSelected()
                    return (
                        <Checkbox
                            checked={selectedRowIds.length > 0 ? isCheck : false}
                            onCheckedChange={(value) => {
                                row.toggleSelected(!!value)
                                setSelectedRowIds && setSelectedRowIds((prev) =>
                                    value
                                        ? [...prev, row.original.id]
                                        : prev.filter((id) => id !== row.original.id))
                            }}
                            aria-label="Select row"
                            className="translate-y-[2px]"
                        />
                    )
                },
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "form_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="form_id"/>

                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className=" truncate ">
                            <Link href={`/admin/users/${id}`}>
                                {row.getValue("form_id")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "form_field_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="form_field_id"/>
                ),
                cell: ({row}) =>
                    <div>{row.getValue("form_field_id")}</div>,
            },
            {
                accessorKey: "user",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="user"/>
                ),
                cell: ({row}) =>{
                    const name = row.getValue("user") ? (row.getValue("user")as any).name :"";
                    return  <div>{name}</div>
                }

            },
            {
                accessorKey: "platform_ids",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="platforms_id"/>
                ),
                cell: ({row}) =>{
                    const name = row.getValue("platform_ids") ? (row.getValue("platform_ids")as any) :[];
                    console.log('name',name)
                    return  <div>
                        {name && name.map((item:any, index:any) => (
                            <div key={index}>platform: {item}</div>
                        ))}
                    </div>
                }

            },
            {
                accessorKey: "additional_status",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="additional_status"/>
                ),
                cell: ({row}) =>{
                    const status = row.getValue("additional_status")
                    return  <div>
                        {status && status == "pending" ? <Tag color="red">pending</Tag> :<Tag color="green">approve</Tag>}
                    </div>
                }

            },
            {
                id: "action",
                cell: ({row}) => {
                    const status = row.getValue("additional_status")
                    return (

                        <>
                            <Button disabled={status && status !=="pending" ? true :false} variant="green" size="sm">
                                Approve
                            </Button>
                        </>
                    )
                }

            },


        ],
        [data, selectedRowIds]
    )
    return (
        <>
            <div className="grid justify-between gap-4 items-stretch content-evenly  md:grid-cols-2 sm:grid-cols-1">
                <PageHeader title="Forms submissions" desc={`all submissions form`}/>
                <div className="flex justify-end w-full">
                    <ShellAction type="action" actionName="Back" actionVoid={() => router.back()}/>
                </div>
            </div>

            <DataTableRaw columns={columns} data={data} showToolbar={false}/>


        </>
    )
}