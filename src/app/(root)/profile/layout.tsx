'use client'
import * as React from "react";
import {SidebarNav} from "@/components/root/profile/side-bar-nav"
import {dashboardConfig} from "@/lib/constants/navbar-config";

interface IProfile {
    children: React.ReactNode
}

export default function ProfileLayout({children}: IProfile) {
    return (

        <div className="flex min-h-screen flex-col">
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                        <SidebarNav items={dashboardConfig.sidebarNav} className="p-1"  type="auth"/>
                </aside>
                <main className="flex w-full flex-col overflow-hidden mt-[3.5rem]">{children}</main>
            </div>
        </div>

    )
}