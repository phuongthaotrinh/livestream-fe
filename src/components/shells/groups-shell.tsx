"use client"

import * as React from "react"
import Link from "next/link"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Checkbox, Tag} from "antd"
import {DataTable} from "@/components/common/data-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {Trash, Edit, PlusCircle,Wrench} from "lucide-react"
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";
import {usePathname, useRouter} from "next/navigation";

interface IGroupsShell {
    data: any[]
    pageCount: number,
    onEdit:(input:any) => void
}

export  function GroupsShell({
                                     data,
                                     pageCount,
                                     onEdit
                                 }: IGroupsShell) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);
    const pathname = usePathname();
    const router = useRouter()

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={(value: any) => {
                            table.toggleAllPageRowsSelected(!!value)
                            setSelectedRowIds((prev) =>
                                prev.length === data.length ? [] : data.map((row) => row.id)
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },

            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "user_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Creator Id"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/groups/${id}`}>
                                {row.getValue("user_id")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status" />
                    )
                },
                cell: ({row}) =>
                    <div>
                        <Tag color={row.getValue("status") == "on" ? "#87d068" : '#f50'}>
                            {row.getValue("status") == "on" ? "active" : 'block'}
                        </Tag>
                    </div>,
            },
            {
                accessorKey: "createdAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Created At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                accessorKey: "updatedAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="updated At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className="flex items-center gap-6">

                        <button
                            className="flex items-center gap-2"
                            onClick={() => toast('Feature is not enable')}
                        >
                            <div
                                className={clsx(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-8",
                                    })
                                )}
                            >
                                <Trash className="mr-2 h-4 w-4" aria-hidden="true"/>
                                Delete
                            </div>
                        </button>
                        
                    </div>


                ),
            },
        ],
        [data, isPending]
    )

    function deleteSelectedRows() {
        // toast.promise(
        //     Promise.all(
        //         selectedRowIds.map((id) =>
        //             deleteProductAction({
        //                 id,
        //             })
        //         )
        //     ),
        //     {
        //         loading: "Deleting...",
        //         success: () => {
        //             setSelectedRowIds([])
        //             return "Products deleted successfully."
        //         },
        //         error: (err: unknown) => {
        //             setSelectedRowIds([])
        //             return catchError(err)
        //         },
        //     }
        // )
        toast('Feature is not enable')
    }


    return (
        <DataTable
            columns={columns}
            data={data}
            pageCount={pageCount}
            searchableColumns={[
                {
                    id: "name",
                    title: "name",
                },
            ]}
            newRowLink={undefined}
            deleteRowsAction={() => void deleteSelectedRows()}
        />
    )
}
