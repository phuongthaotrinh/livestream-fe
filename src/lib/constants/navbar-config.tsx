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
            icon: "layout_grid",
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
        getItem('User', 'User', <UserRound className="w-4 h-4"/>, [
            getItem(<Link href="/admin/users">List</Link>, 'User1'),
        ]),
        getItem('PLatform', 'PLatform', <Tv2 className="w-4 h-4"/>, [
            getItem(<Link href="/admin/platform">List</Link>, 'PLatform1')
        ]),
        getItem('News', 'News', <Newspaper className="w-4 h-4"/>, [
            getItem(<Link href="/admin/news">List</Link>, 'News1'),
        ]),
        getItem('Roles', 'Roles', <VenetianMask className="w-4 h-4"/>, [
            getItem(<Link href="/admin/roles">List</Link>, 'Roles1'),
        ]),
        getItem('Livestream', 'Livestream', <LayoutGrid className="w-4 h-4"/>, [
            getItem(<Link href="/admin/livestream">List</Link>, 'livestream1'),
            getItem(<Link href="/admin/livestream/types">livestream types</Link>, 'livestream_types1'),
        ]),
        getItem('Sliders', 'Sliders', <GalleryHorizontalEnd className="w-4 h-4"/>, [
            getItem(<Link href="/admin/sliders">List</Link>, 'sliders_1'),
        ]),
        getItem('Groups', 'Groups', <Group className="w-4 h-4"/>, [
            getItem(<Link href="/admin/groups">List</Link>, 'groups_1'),
        ]),

    ],

}