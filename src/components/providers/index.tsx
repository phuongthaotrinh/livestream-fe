'use client';
import {ConfigProvider} from 'antd';
import * as React from "react"
import theme from "@/lib/themes/antd-theme";
import {Toaster} from 'react-hot-toast';
import {AuthProvider} from "@/lib/context/AuthProvider"

export default function Providers({children}: { children: React.ReactNode }) {

    return (
        <>
            <ConfigProvider
                theme={theme}>
                <React.Fragment>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </React.Fragment>
                <Toaster/>
            </ConfigProvider>

        </>
    )
}