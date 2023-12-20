
import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
    sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
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



}