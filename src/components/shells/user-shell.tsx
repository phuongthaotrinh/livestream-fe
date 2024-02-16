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
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {fallbackImg} from "@/lib/constants/fallbackImg";
import useApiUsers from "@/_actions/users"
import {useAuth} from "@/lib/hooks/use-auth";
import {Checkbox} from "@/components/common/ui/checkbox"
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {usePathname} from "next/navigation";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect"
export function UserTableShell() {
    const [users, setUsers] = React.useState([]);
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const {deleteUser, createUser,getUsers, blockUser,unblockUser} = useApiUsers();
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const [trigger2, setTrigger2] = React.useState<boolean>(false)

    const {profile} = useAuth();
    const pathname = usePathname();

    function fetch () {
        startTransition( async () => {
            try {
                const {data} = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error in fetching roles:', error);
            }

        })
    }
    React.useEffect(() => {
        if(trigger || trigger2) fetch()
    }, [trigger,trigger2]);

    React.useEffect(() => {
            fetch()
    }, []);

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
                                prev.length === users.length ? [] : users.map((row:any) => row.id)
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
                        <Tag color={row.getValue("block") == false ? "#87d068" : '#f50'}>
                            {row.getValue("block") == false ? "active" : 'block'}
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
                                    {row.original.block ? (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                startTransition(() => {
                                                    toast.promise((unblockUser(row.original.id)),
                                                        {
                                                            loading: "Loading...",
                                                            success: () => {
                                                                setTrigger(true)
                                                                return "Save change successfully."
                                                            },
                                                            error: (err: unknown) => catchError(err),
                                                        }
                                                    )
                                                })
                                            }}
                                        >
                                          UnBlock
                                        </DropdownMenuItem>
                                    ):(
                                        <DropdownMenuItem
                                            onClick={() => {
                                                startTransition(() => {
                                                    toast.promise((blockUser(row.original.id)),
                                                        {
                                                            loading: "Loading...",
                                                            success: () => {
                                                                setTrigger2(true)
                                                                return "Save change successfully."
                                                            },
                                                            error: (err: unknown) => catchError(err),
                                                        }
                                                    )
                                                })
                                            }}
                                        >
                                            Block
                                        </DropdownMenuItem>
                                    )}
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [users,trigger]
    )

    function deleteSelectedRows() {
        const deletePromises = selectedRowIds.map((id) =>
            deleteUser({ id })
        );
        toast.promise(
            Promise.all(deletePromises),
            {
                loading: "Deleting...",
                success: () => {
                    setSelectedRowIds([]);
                    startTransition(() => {
                        fetch();
                    });
                    return "Users deleted successfully.";
                },
                error: (err) => {
                    setSelectedRowIds([]);
                    startTransition(() => {fetch(); });
                    return catchError(err);
                },
            }
        );
    }

    return (
        <>
            <DataTableRaw
                columns={columns}
                data={users}
                nameExport="users"
                searchableColumns={[
                    {
                        id: "name",
                        title: "name",
                    },
                ]}
                newRowLink={`${pathname}/create`}
                deleteRowsAction={() => void deleteSelectedRows()}
                revalidAction={() => void fetch()}
                createDataAction={createUser}
            />

        </>
    )
}
