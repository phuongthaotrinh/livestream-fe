"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/common/ui/table"

import {DataTablePagination} from "@/components/common/data-table/components/pagination"
import {DataTableToolbar} from "@/components/common/data-table/components/toolbar"
import {DataTableFilterableColumn, DataTableSearchableColumn} from "@/types";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    searchableColumns?: DataTableSearchableColumn<TData>[]
    filterableColumns?: DataTableFilterableColumn<TData>[],
    newRowLink?: string,
    deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>,
    newRowAction?: React.MouseEventHandler<HTMLButtonElement>,
    nameExport?:string;
    revalidAction?:() => void;
    createDataAction?: (body: any) => Promise<any>
}

export function DataTableRaw<TData, TValue>({
                                                columns,
                                                data,
                                                searchableColumns,
                                                filterableColumns = [],
                                                newRowLink,
                                                newRowAction,
                                                deleteRowsAction,
                                                nameExport,
                                                revalidAction,
                                                createDataAction
                                            }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4 w-full">
            <DataTableToolbar table={table}
                              filterableColumns={filterableColumns}
                              searchableColumns={searchableColumns}
                              newRowLink={newRowLink}
                              deleteRowsAction={deleteRowsAction}
                              newRowAction={newRowAction}
                              data={data}
                              nameExport={nameExport}
                              revalidAction={revalidAction}
                              createDataAction={createDataAction}

            />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table && table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel()?.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full overflow-hidden">
                <DataTablePagination table={table} showRowPerPage={false}/>
            </div>
        </div>
    )
}