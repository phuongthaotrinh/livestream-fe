"use client"

import * as React from "react"
import Link from "next/link"
import {MoreVertical } from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table";
import {formatDate} from "@/lib/helpers";
import {Button} from "@/components/common/ui/button"
import {Checkbox} from "antd"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/common/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {fallbackImg} from "@/lib/constants/fallbackImg";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {useApiAdditional} from "@/_actions/additional";



export  function SliderShell() {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);
    const [isPending, startTransition] = React.useTransition();
    const [data, setData] = React.useState([]);
    const {getSliders} = useApiAdditional();

    React.useEffect(() => {
        startTransition(() => {
            const fetchData = async () => {
                try {
                    const {data} = await getSliders();
                    setData(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            };
            fetchData();
        });
    }, []);




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
                                prev.length === data.length ? [] : data.map((row:any) => row.id)
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
                accessorKey: "image",
                header: ({column}) => (
                 <p>Image</p>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    const images = row.original.image_link as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/users/${id}`}>

                                <img src={images ? images : fallbackImg}
                                     className="w-12 h-12"

                                />
                            </Link>
                        </div>
                    )
                },
            },

            {
                accessorKey: "position",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="position"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/sliders/${id}`}>

                                {row.getValue("position")}
                            </Link>
                        </div>
                    )
                },
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
                                    href={`/admin/sliders/${row.original.id}`}
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
            newRowLink={`/admin/sliders/create`}
            nameExport="slider"

        />
    )
}
