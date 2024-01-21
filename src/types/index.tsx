import type {Icons} from "@/components/common/icons"
import {CollapsePanelProps} from "rc-collapse/es/interface";
import type {MenuProps} from 'antd';
import React from "react";
import {satisfies} from "next/dist/lib/semver-noop";

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
    id: keyof TData
    title: string
}

export interface DataTableFilterableColumn<TData>
    extends DataTableSearchableColumn<TData> {
    options: Option[]
}

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
    description?: string
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}


export interface MainNavChildren {
    href: string,
    label: string,
    activeLink: string
}

export type MainNavItem = MainNavChildren;

export type SidebarNavItem = NavItemWithChildren;


export interface ItemType extends Omit<CollapsePanelProps, 'header' | 'prefixCls' | 'panelKey' | 'isActive' | 'accordion' | 'openMotion' | 'expandIcon'> {
    key?: CollapsePanelProps['panelKey'];
    label?: CollapsePanelProps['header'];
    ref?: React.RefObject<HTMLDivElement>;
}


export type MenuItem = Required<MenuProps>['items'][number];