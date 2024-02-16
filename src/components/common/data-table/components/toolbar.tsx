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
import * as XLSX from "xlsx";
import {Modal} from "antd";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filterableColumns?: DataTableFilterableColumn<TData>[]
    searchableColumns?: DataTableSearchableColumn<TData>[]
    newRowLink?: string
    deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>,
    newRowAction?: React.MouseEventHandler<HTMLButtonElement>,
    data:any[],
    nameExport?:string,
    revalidAction?: () => void,
    createDataAction: (body: any) => Promise<any>}

export function DataTableToolbar<TData>({
                                            table,
                                            filterableColumns = [],
                                            searchableColumns = [],
                                            newRowLink,
                                            deleteRowsAction,
                                            newRowAction,
                                            data,
                                            nameExport,
                                            revalidAction,
                                            createDataAction
                                        }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [isPending, startTransition] = React.useTransition();
    const [open,setOpen] = React.useState<boolean>(false);
    const [excelFile, setExcelFile] = React.useState<any>(null);
    const [typeError, setTypeError] = React.useState<string | null>(null);
    const [excelData, setExcelData] = React.useState<any>(null);



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

    const handleFile=(e:any)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e:any)=>{
                    setExcelFile(e.target.result);
                }
            }
            else{
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else{
            console.log('Please select your file');
        }
    }

    // submit event
    const handleFileSubmit=(e:any)=>{
        e.preventDefault();
        if(excelFile!==null){
            const workbook = XLSX.read(excelFile,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data:any = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0,10));
        }
    }

    function modalCancel  () {
        setOpen(false);
        setExcelFile(null);
        setExcelData(null);
        setTypeError("")
    }

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
                {createDataAction && (
                    <>
                        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                            <UploadCloud className="mr-2 h-4 w-4" />
                            Excel
                        </Button>
                        <Modal width="100vw"
                               title="Import exel"
                               open={open}
                               okType="default"
                               confirmLoading={isPending}
                               onCancel={modalCancel}
                               onOk={() => {
                                   startTransition(() =>{
                                       toast.promise(
                                           Promise.all(
                                               excelData.map((item:any) =>
                                                   createDataAction(item)
                                               )
                                           ),
                                           {
                                               loading: "Loading...",
                                               success: () => {
                                                   startTransition(() => {
                                                       revalidAction && revalidAction()
                                                   });
                                                   modalCancel();
                                                   return "Add user successfully."
                                               },
                                               error: (err: unknown) => {
                                                   modalCancel()
                                                   return catchError(err)
                                               },
                                           }
                                       )
                                   })
                               }}
                        >
                            <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                                <input type="file" className="form-control" required onChange={handleFile} /><br/>
                                { excelFile!==null && typeError!==null && <button type="submit" className="btn btn-success btn-md">UPLOAD</button>}
                                <Button type="submit" variant="green">UPLOAD</Button>
                                {typeError&&(
                                    <div className="alert alert-danger" role="alert">{typeError}</div>
                                )}
                            </form>
                            <div className="viewer">
                                {excelData?(
                                    <div className="table-responsive">
                                        <table className="table-auto">
                                            <thead>
                                            <tr>
                                                {Object.keys(excelData[0]).map((key)=>(
                                                    <th key={key}>{key}</th>
                                                ))}
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {excelData && excelData?.map((individualExcelData:any, index:any)=>(
                                                <tr key={index}>
                                                    {Object.keys(individualExcelData).map((key)=>(
                                                        <td key={key}>{individualExcelData[key]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>

                                        </table>
                                    </div>
                                ):(
                                    <div>No File is uploaded yet!</div>
                                )}
                            </div>
                        </Modal>
                    </>
                )}

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
