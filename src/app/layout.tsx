import type {Metadata} from 'next'
import './globals.css';
import * as React from "react";
import Providers from "@/components/providers"


export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="custom-scroll" id="body">
        <Providers>
            <div className="min-h-screen">
                <React.Fragment>
                    {children}
                </React.Fragment>
            </div>
        </Providers>
        </body>
        </html>
    )
}