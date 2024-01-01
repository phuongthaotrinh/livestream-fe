'use client';
import {ConfigProvider} from 'antd';
import * as React from "react"
import theme from "@/lib/themes/antd-theme";
import {Toaster} from 'react-hot-toast';

export default function Providers({children}: { children: React.ReactNode }) {

    return (
        <>
            <ConfigProvider theme={theme}>
                <React.Fragment>
                    {children}
                </React.Fragment>
                <Toaster/>
            </ConfigProvider>

        </>
    )
}