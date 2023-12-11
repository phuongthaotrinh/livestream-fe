'use client';

import {AdminMenu} from "@/layouts/admin/menu";
import * as React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Button, theme, Grid} from 'antd';

const {Header, Sider, Content} = Layout;

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const {xs} = Grid.useBreakpoint();
    return (
        <>
            <Layout>
                <Sider trigger={null}
                       breakpoint="xs"
                       collapsedWidth={xs ? 0 : undefined}
                       collapsible
                       collapsed={collapsed}
                       width={256}
                >
                    <div className="bg-black/40 h-16 pl-7">
                        <div className="font-semibold text-white uppercase h-full flex items-center gap-x-3 justify-start">
                            <VideoCameraOutlined />
                            {!collapsed &&  <span> Gracie shop</span>}
                        </div>
                    </div>
                    <AdminMenu />
                </Sider>
                <Layout>
                    <Header style={{padding: 0, background: colorBgContainer}}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "100vh",
                            background: colorBgContainer,
                            height:"auto"
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>

        </>
    )
}