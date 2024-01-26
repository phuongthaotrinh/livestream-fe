import {MenuProps} from "antd";
import React from "react";
import Link from "next/link"
import {getItem} from "@/lib/helpers";
import {ItemType, type MainNavItem, type SidebarNavItem} from "@/types"
import {UserRound, LayoutGrid, Newspaper, Group, GalleryHorizontalEnd, Tv2 ,VenetianMask } from "lucide-react";

export interface NavbarConfig {
    sidebarNav: SidebarNavItem[],
    homeNav: MainNavItem[],
    adminNav:MenuProps['items']
}

export const dashboardConfig: NavbarConfig = {
    sidebarNav: [
        {
            title: "Profile",
            href: "/profile/account",
            icon: "avatar",
            items: [],
        },
        {
            title: "Notifications",
            href: "/profile/notifications",
            icon: "notifications",
            items: [],
        },
        {
            title: "Platforms",
            href: "/profile/platforms",
            icon: "layout_grid",
            items: [],
        },
        {
            title: "Groups",
            href: "/profile/groups",
            icon: "users",
            items: [],
        },
        {
            title: "Forms",
            href: "/profile/fsubmission",
            icon: "scroll_text",
            items: [],
        },
    ],
    homeNav: [
        {
            href: '/',
            label: 'Home',
            activeLink: '/'
        },
        {
            href: '/post',
            label: 'News',
            activeLink: '/post'
        }
    ],
    adminNav: [
        getItem(
            <Link href="/admin/users">Users</Link>,
            'User',
            <UserRound className="w-4 h-4"/>,
        ),
        getItem(
            <Link href="/admin/platform">PLatforms</Link>,
            'PLatform',
            <Tv2 className="w-4 h-4"/>,
        ),
        getItem(
            <Link href="/admin/news">News</Link>,
            'News1',
            <Newspaper className="w-4 h-4"/>,
        ),
        getItem(
            <Link href="/admin/sliders">Sliders</Link>,
            'sliders',
            <GalleryHorizontalEnd className="w-4 h-4"/>,
        ),
        getItem(
            <Link href="/admin/groups">Groups</Link>,
            'groups_1',
            <Group className="w-4 h-4"/>,
        ),
        getItem('Roles & Permissions', 'Roles&Permissions', <VenetianMask className="w-4 h-4"/>, [
            getItem(<Link href="/admin/roles">Roles</Link>, 'Roles1'),
            getItem(<Link href="/admin/roles/permission">Permissions</Link>, 'Permissions'),
        ]),
        getItem('Forms', 'Forms', <Tv2 className="w-4 h-4"/>, [
            getItem(<Link href="/admin/forms/submission-form">All submission forms</Link>, 'submission1'),
            getItem(<Link href="/admin/forms">Forms</Link>, 'forms1')
        ]),
    ],

}