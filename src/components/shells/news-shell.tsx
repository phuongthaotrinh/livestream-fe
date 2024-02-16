"use client"

import * as React from "react"
import Link from "next/link"
import {MoreVertical } from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Button} from "@/components/common/ui/button"
import {Checkbox, Tag} from "antd"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/common/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {useApiAdditional} from "@/_actions/additional";

export  function NewsTableShell() {
    const {getNews} = useApiAdditional();
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async () => {
            const {data} = await getNews();
            setData(data)
        })()
    }, [])


    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])



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
                accessorKey: "title",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Title"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/news/${id}`}>

                                {row.getValue("title")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "preview",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="preview" />
                    )
                },
                cell: ({row}) =>
                    <div className="truncate ">{row.getValue("preview")}</div>,
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
                        <Tag color={row.getValue("status") == true ? "#87d068" : '#f50'}>
                            {row.getValue("status") == true ? "active" : 'block'}
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label="Open menu"
                                variant="ghost"
                                // className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem >
                                <Link
                                    href={`/admin/news/${row.original.id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [data, isPending]
    )

    return (
        <DataTableRaw
            columns={columns}
            data={data}
            searchableColumns={[
                {
                    id: "title",
                    title: "title",
                },
            ]}
            newRowLink={`/admin/news/create`}
            nameExport="news"

        />
    )
}
