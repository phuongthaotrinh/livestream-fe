"use client"

import Link from "next/link";
import type {SidebarNavItem,MainNavItem} from "@/types"
import clsx from "clsx";
import {usePathname, useSelectedLayoutSegment} from "next/navigation"
import {Icons} from "@/components/common/icons";
import {ChevronLeftIcon} from "lucide-react"

type INavbarProps = {
    items :MainNavItem[],
    type:'home'
}|{
    items :SidebarNavItem[],
    type:'auth'
}

export function SidebarNav({className, items,type, ...props}: INavbarProps & React.HTMLAttributes<HTMLDivElement>) {
    const segment = useSelectedLayoutSegment();
    const pathName = usePathname();
    if (!items?.length) return null
    return (

        <>
            {!type || type === 'auth' && (
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
            )}

            {type === "home" && (
                <>
                    <nav className={clsx("flex item-center space-x-4 lg:space-x-6", className)}>
                        {items.map((item) =>{
                            const isTrue = pathName === item.activeLink ? true : false
                            return  (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        {
                                            "text-red-600" : isTrue,
                                            "text-black" : !isTrue,
                                        }
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </>
            )}
        </>
    )
}