import React from 'react';
import {UserRound, LayoutGrid, Newspaper} from "lucide-react"
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from "next/link"
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [

    getItem('User', 'User', <UserRound className="w-4 h-4" />, [
        getItem(<Link href="/admin/users">List</Link>, 'User1'),
    ]),
    getItem('PLatform', 'PLatform', <LayoutGrid  className="w-4 h-4" />, [
        getItem(<Link href="/admin/platform">List</Link>, 'PLatform1'),
    ]),
    getItem('News', 'News', <Newspaper  className="w-4 h-4" />, [
        getItem(<Link href="/admin/news">List</Link>, 'News1'),
    ]),

];

export const AdminMenu: React.FC = () => {
    const onClick: MenuProps['onClick'] =   (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            theme="dark"
        />
    );
};