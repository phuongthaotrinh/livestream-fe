import React from 'react';
import {Menu} from 'antd';
import {dashboardConfig} from "@/lib/constants/navbar-config";

export const AdminMenu: React.FC = () => {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            items={dashboardConfig.adminNav}
            theme="dark"
        />
    );
};
