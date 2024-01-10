"use client"

import * as React from "react"
import Link from "next/link"
import {MoreVertical} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Button} from "@/components/common/ui/button"
import {Tag} from "antd"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/common/ui/dropdown-menu"
import {DataTable} from "@/components/common/data-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {fallbackImg} from "@/lib/constants/fallbackImg";
import useApiUsers from "@/_actions/users"
import {useAuth} from "@/lib/hooks/use-auth";
import {Checkbox} from "@/components/common/ui/checkbox"

interface ProductsTableShellProps {
    data: any[]
    pageCount: number
}

export function UserTableShell({
                                   data,
                                   pageCount,
                               }: ProductsTableShellProps) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const {deleteUser} = useApiUsers();
    const {profile} = useAuth();

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);
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
                        onCheckedChange={(value) => {
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
                    <DataTableColumnHeader column={column} title="Image"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    const images = row.original.images as string;
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
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/users/${id}`}>

                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "fullName",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="fullName"/>
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("fullName")}</div>,
            },
            {
                accessorKey: "email",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="email"/>
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("email")}</div>,
            },
            {
                accessorKey: "block",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) =>
                    <div>
                        <Tag color={row.getValue("block") == 0 ? "#87d068" : '#f50'}>
                            {row.getValue("block") == 0 ? "active" : 'block'}
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
                            >
                                <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>
                                <Link
                                    href={`/admin/users/${row.original.id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {(profile?.user?.id != row.original.id) && (
                                <>

                                    <DropdownMenuItem
                                        onClick={() => {
                                            startTransition(() => {
                                                row.toggleSelected(false)
                                                // @ts-ignore
                                                toast.promise((deleteUser({id: row.original.id})),
                                                    {
                                                        loading: "Deleting...",
                                                        success: () => "Product deleted successfully.",
                                                        error: (err: unknown) => catchError(err),
                                                    }
                                                )

                                            })
                                        }}
                                        disabled={isPending}
                                    >
                                        Delete
                                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [data, isPending]
    )

    function deleteSelectedRows() {
        toast.promise(
            Promise.all(
                selectedRowIds.map((id) =>
                    deleteUser({
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

    const userStatus = [
        {
            label: 'avtive',
            value: '0'
        },
        {
            label: 'block',
            value: '1'
        }
    ]
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
            filterableColumns={[
                {
                    id: "block",
                    title: "status",
                    options: userStatus.map((category) => ({
                        label: category.label,
                        value: category.value,
                    })),
                },
            ]}
            newRowLink={`/admin/users/create`}
            deleteRowsAction={() => void deleteSelectedRows()}
        />
    )
}
