"use client"

import * as React from "react"
import Link from "next/link"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Checkbox} from "antd"
import {DataTable} from "@/components/common/data-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {Trash, Edit, PlusCircle} from "lucide-react"
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";

interface IPLatformFiledsTableShell {
    data: any[]
    pageCount: number,
    onEdit:(input:any) => void
}

export  function PlatformFiledsShell({
                                     data,
                                     pageCount,
                                     onEdit
                                 }: IPLatformFiledsTableShell) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

    function deleteProductAction({id}: any) {

    }

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
                            <Link href={`/admin/movie-types/${id}`}>

                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "type",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Type"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/movie-types/${id}`}>

                                {row.getValue("type")}
                            </Link>
                        </div>
                    )
                },
            },

            // {
            //     accessorKey: "createdAt",
            //     header: ({column}) => (
            //         <DataTableColumnHeader column={column} title="Created At"/>
            //     ),
            //     cell: ({cell}) => formatDate(cell.getValue() as Date),
            //     enableColumnFilter: false,
            // },
            // {
            //     accessorKey: "updatedAt",
            //     header: ({column}) => (
            //         <DataTableColumnHeader column={column} title="updated At"/>
            //     ),
            //     cell: ({cell}) => formatDate(cell.getValue() as Date),
            //     enableColumnFilter: false,
            // },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className="flex items-center gap-6">

                        <button
                            className="flex items-center gap-2"

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
                                Xóa
                            </div>
                        </button>
                        <button
                            className="flex items-center gap-2"
                            onClick={() => onEdit(row.original)}
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
                                <Edit className="mr-2 h-4 w-4" aria-hidden="true"/>
                                Edit
                            </div>
                        </button>

                    </div>


                ),
            },
        ],
        [data, isPending]
    )

    function deleteSelectedRows() {
        toast.promise(
            Promise.all(
                selectedRowIds.map((id) =>
                    deleteProductAction({
                        id,
                    })
                )
            ),
            {
                loading: "Deleting...",
                success: () => {
                    setSelectedRowIds([])
                    return "Products deleted successfully."
                },
                error: (err: unknown) => {
                    setSelectedRowIds([])
                    return catchError(err)
                },
            }
        )
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
