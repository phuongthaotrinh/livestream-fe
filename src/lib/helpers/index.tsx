import * as z from "zod";
import {toast} from "react-hot-toast"
import {redirect, usePathname, useRouter} from "next/navigation";
import * as React from "react";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect";
import axios, {AxiosError} from "axios";
import {MenuItem} from "@/types";


export function catchError(err: unknown) {
    if (err instanceof z.ZodError) {
        const errors = err.issues.map((issue) => {
            return issue.message
        })
        return toast.error(errors.join("\n"))
    } else if (err instanceof AxiosError) {
        if (err.response) {
            const message = err.response.data.message;
            return toast.error(message)
        } else {
            return toast.error(err.message)
        }
    } else {
        return toast.error("Something went wrong, please try again later.")
    }
}

export function formatDate(date: Date | string | number) {
    if (date) {
        return new Intl.DateTimeFormat("vi-VN", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date))
    } else return
}


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}

export const useGetLastPath = () => {
    const [newPath, setnewPath] = React.useState("");
    const pathname = usePathname();
    useIsomorphicLayoutEffect(() => {
        const paths = pathname.split('/');
        setnewPath(paths[paths.length - 1]);

    }, [pathname])
    return newPath
}


interface Item {
    [key: string]: any;
}

export const uniqueResult = (arr1: Item[], arr2: any[], filterAttr1: string, filterAttr2: string): Item[] | null => {
    if (!arr1.every(item => filterAttr1 in item) || !arr2.every(item => filterAttr2 in item)) {
        return null;
    }
    const existId = new Set(arr2.map(item => item[filterAttr2]));
    const response = arr1.filter(item => !existId.has(item[filterAttr1]));

    return response;
};

export function getUniqueRecordsByField(
    input: any[][],
    uniqueField: any,
    type:"single" | "multi"
): any[] {
    const uniqueRecordsMap = new Map<any, any>();
    const uniqueRecords: any[] = [];

    if(type == "multi"){

        input.forEach((recordsGroup: any[]) => {
            recordsGroup.forEach((record: any) => {
                const fieldValue = record[uniqueField];
                if (!uniqueRecordsMap.has(fieldValue)) {
                    uniqueRecordsMap.set(fieldValue, record);
                    uniqueRecords.push(record);
                }
            });
        });

    }else{
        for (const record of input) {
            uniqueRecordsMap.set(record[uniqueField], record);
        }
        uniqueRecordsMap.forEach((record) => {
            uniqueRecords.push(record);
        });
    }
    return uniqueRecords;
}


export function hasActivePermission(userPermissions: any[], allowedPermissions: number[]): boolean {
    return userPermissions.some(
        (permission) => permission.status === "on" && allowedPermissions.includes(Number(permission.permission.id))
    );
}

export function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export function hasAdminRole(roles: any[]) {
    return roles.some(role => role.role.name === 'admin');
}