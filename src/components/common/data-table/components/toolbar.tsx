"use client"

import * as React from "react"
import Link from "next/link"
import type {
    DataTableFilterableColumn,
    DataTableSearchableColumn,
} from "@/types"
import {X, PlusCircle, TrashIcon, UploadCloud, Settings2, DownloadCloud} from "lucide-react"
import type { Table } from "@tanstack/react-table"

import clsx from "clsx";
import { Button, buttonVariants } from "@/components/common/ui/button"
import { Input } from "@/components/common/ui/input"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"
import {} from "lucide-react"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filterableColumns?: DataTableFilterableColumn<TData>[]
    searchableColumns?: DataTableSearchableColumn<TData>[]
    newRowLink?: string
    deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>,
    newRowAction?: React.MouseEventHandler<HTMLButtonElement>,
    data:any[],
    nameExport?:string
}

export function DataTableToolbar<TData>({
                                            table,
                                            filterableColumns = [],
                                            searchableColumns = [],
                                            newRowLink,
                                            deleteRowsAction,
                                            newRowAction,
                                            data,
                                            nameExport
                                        }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [isPending, startTransition] = React.useTransition();

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer,nameExport);
        });
    };
    const saveAsExcelFile = (buffer:any, fileName:any) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


    return (
        <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
            <div className="flex flex-1 items-center space-x-2">

                {searchableColumns.length > 0 &&
                    searchableColumns.map(
                        (column) =>
                            table.getColumn(column.id ? String(column.id) : "") && (
                                <Input
                                    key={String(column.id)}
                                    placeholder={`Filter ${column.title}...`}
                                    value={
                                        (table
                                            .getColumn(String(column.id))
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(String(column.id))
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="h-8 w-[150px] lg:w-[250px]"
                                />
                            )
                    )}
                {filterableColumns.length > 0 &&
                    filterableColumns.map(
                        (column) =>
                            table.getColumn(column.id ? String(column.id) : "") && (
                                   <DataTableFacetedFilter
                                       key={String(column.id)}
                                       column={table.getColumn(column.id ? String(column.id) : "")}
                                       title={column.title}
                                       options={column.options}
                                   />
                            )
                    )}
                {isFiltered && (
                    <Button
                        aria-label="Reset filters"
                        variant="ghost"
                        className="h-8 px-2 lg:px-3"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                )}

            </div>
            <div className="flex items-center space-x-2">
                {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
                    <Button
                        aria-label="Delete selected rows"
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={(event) => {
                            startTransition(() => {
                                table.toggleAllPageRowsSelected(false)
                                deleteRowsAction(event)
                            })
                        }}
                        disabled={isPending}
                    >
                        <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                        Delete
                    </Button>
                ) : newRowLink ? (
                    <Link aria-label="Create new row" href={newRowLink}>
                        <div
                            className={clsx(
                                buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                    className: "h-8",
                                })
                            )}
                        >
                            <PlusCircle  className="mr-2 h-4 w-4" aria-hidden="true" />
                            New
                        </div>
                    </Link>
                ) : newRowAction ? (<>
                    <Button
                        aria-label="Delete selected rows"
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={(event) => {
                            startTransition(() => {
                                newRowAction(event)
                            })
                        }}
                        disabled={isPending}
                    >
                        <PlusCircle  className="mr-2 h-4 w-4" aria-hidden="true" />
                        New
                    </Button>
                </>) :null}
                <DataTableViewOptions table={table} />
                <div className="flex items-center space-x-2" >
                    <Button
                        onClick={exportExcel}
                        aria-label="Toggle columns"
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <DownloadCloud className="mr-2 h-4 w-4" />
                        Excel
                    </Button>

                </div>
            </div>
        </div>
    )
}
