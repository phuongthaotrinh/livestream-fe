"use client"

import Link from "next/link";
import type {SidebarNavItem} from "@/types"
import clsx from "clsx";
import {useSelectedLayoutSegment} from "next/navigation"
import {Icons} from "@/components/common/icons";
import {ChevronLeftIcon} from "lucide-react"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
    items: SidebarNavItem[]
}

export function SidebarNav({className, items, ...props}: SidebarNavProps) {
    const segment = useSelectedLayoutSegment()
    if (!items?.length) return null
    return (

        <div className={clsx("flex w-full flex-col gap-2", className)} {...props}>
            {items.map((item, index) => {
                const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon
                const isTrue = item && item?.href?.includes(String(segment))
                return item.href ? (
                    <Link
                        aria-label={item.title}
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noreferrer" : ""}
                    >
                        <span
                            className={clsx(
                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-slate-200 hover:text-foreground",
                                {
                                    "bg-slate-200 font-medium text-black": isTrue,
                                    "text-gray-600": !isTrue,
                                    "pointer-events-none opacity-60": item.disabled
                                }
                            )}
                        >
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true"/>
                          <span>{item.title}</span>
                        </span>
                    </Link>
                ) : (
                    <span
                        key={index}
                        className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                    >
                    {item.title}
                  </span>

                )})}
        </div>
    )
}