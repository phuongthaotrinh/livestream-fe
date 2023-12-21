'use client'
import Link from "next/link";
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";
import {ChevronLeftIcon, MoveLeft} from "lucide-react";
import {Space} from "antd";
import * as React from "react";
import {Icons} from "@/components/common/icons";

 interface IShellBack {
     href: string,
     actionName: string,
     icon?: React.ComponentType<{ className?: string }>
 }
export function ShellAction ({href,actionName,icon, ...props}:IShellBack) {
    const Icon =  icon ? icon : MoveLeft
    return (
        <>
            <Space>
                <div className="flex justify-end" {...props}>
                    <Link aria-label="back" href={href}>
                        <div
                            className={clsx(
                                buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                    className: "h-8",
                                })
                            )}
                        >
                            <Icon className="mr-2 h-4 w-4" aria-hidden="true"/>
                            {actionName}
                        </div>
                    </Link>
                </div>
            </Space>



        </>
    )
}