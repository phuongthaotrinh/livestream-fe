'use client';

import {AdminMenu} from "@/layouts/admin/menu";
import * as React from "react";
import {Home, Menu} from "lucide-react"
import {Layout, Button, theme, Grid} from 'antd';
import Link from "next/link"
import {useMounted} from "@/lib/hooks/use-mounted";

const {Header, Sider, Content} = Layout;
import Index from "@/layouts/root/header/components/user-nav"

export  function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const {xs} = Grid.useBreakpoint();
    const mounted = useMounted();
    return (
        <>
            {mounted && (
                <Layout>
                    <Sider trigger={null}
                           breakpoint="xs"
                           collapsedWidth={xs ? 0 : undefined}
                           collapsible
                           collapsed={collapsed}
                           width={200}
                    >
                        <div className="bg-black/40 h-16 pl-7">
                            <div
                                className="font-semibold text-white uppercase h-full flex items-center gap-x-3 justify-start">
                                <Home className="w-4"/>
                                {!collapsed && <Link href="/"> Gracie shop</Link>}
                            </div>
                        </div>
                        <AdminMenu/>
                    </Sider>
                    <Layout>
                        <Header style={{ background: colorBgContainer}}
                                className="flex items-center justify-between p-0">
                            <Button
                                type="text"
                                icon={<Menu/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <div className="pr-6">
                                <Index/>
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: "100vh",
                                background: colorBgContainer,
                                height: "auto"
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            )}
        </>
    )
}