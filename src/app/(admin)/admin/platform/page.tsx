'use client';

import {PageHeader} from "@/components/common/page-header";
import {PLatformTableShell} from "@/components/shells/platform-shell";
import React from 'react';
import useApiPlatform from "@/_actions/platforms"

export default function Platform() {
    const [pending, startTransition] = React.useTransition();
    const {getAll} = useApiPlatform()
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        startTransition(() => {
            const fetchData = async () => {
                try {
                    const {data} = await getAll();
                    console.log('data getAll', data)
                    setData(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            };
            fetchData();
        });
    },[]);



    return (
        <>
            <PageHeader title="Platforms" desc="your list platform is here"/>
            <div className="my-6">
                <PLatformTableShell data={data} pageCount={1}/>
            </div>

        </>
    )
}