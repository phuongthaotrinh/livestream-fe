'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {ShellAction} from "@/components/common/shell-back";
import {PlusCircle, MoreVertical, Pencil} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import useApiPlatform from "@/_actions/platforms";
import {Card} from "antd"
import {IListFormOfPlatform} from "@/lib/validation/live-stream-type";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/common/ui/dropdown-menu";
import {Button} from "@/components/common/ui/button";
import {toast} from "react-hot-toast";
import {LoadingSpin} from "@/components/common/loading-spin";

interface IPlatformDetailTemplate {
    params: any
};

export function PlatformDetailTemplate({params}: IPlatformDetailTemplate) {
    const [isPending, startTransition] = React.useTransition();
    const platform_id = Number(params.id);
    const router = useRouter();
    const pathname = usePathname();
    const {ListFormsOfPlatform, getAllFormsOfPlatform} = useApiPlatform();
    const [data, setData] = React.useState<any[]>([])

    React.useEffect(() => {
        startTransition(() => {
            // (async () => {
            //     // const data = await ListFormsOfPlatform(platform_id) as IListFormOfPlatform[];
            //     const data = await getAllFormsOfPlatform(platform_id);
            //     const res = data?.data.form as any[];
            //     console.log('res', res)
            //     setData(res)
            // })()
        })
    }, [platform_id]);


    return (
        <React.Suspense fallback={<LoadingSpin />}>
            <PageHeader title={`Forms of platform:${platform_id}`} desc="All form"/>

            {/*<div className="my-5 space-y-5">*/}
            {/*    <Card title={`List form of platform ${data['name'] as string}`} hoverable={false}>*/}
            {/*        {data?.map((item, index) => (*/}
            {/*            <Card.Grid className="w-1/4 text-left" key={index} hoverable={false}>*/}
            {/*                <div className="flex justify-between items-center w-full">*/}
            {/*                    <div>*/}
            {/*                        form_id: {item?.info?.id} <br/>*/}
            {/*                        platform_type: {item?.live_type_info?.name}*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <DropdownMenu>*/}
            {/*                            <DropdownMenuTrigger asChild>*/}
            {/*                                <Button*/}
            {/*                                    aria-label="Open menu"*/}
            {/*                                    variant="ghost"*/}
            {/*                                >*/}
            {/*                                    <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>*/}
            {/*                                </Button>*/}
            {/*                            </DropdownMenuTrigger>*/}
            {/*                            <DropdownMenuContent align="end" className="w-[160px]">*/}
            {/*                                <DropdownMenuItem className="cursor-pointer"*/}
            {/*                                                  onClick={() => {*/}
            {/*                                                      router.push(`${pathname}/edit/${item?.info?.id}`);*/}
            {/*                                                      window.history.pushState(item, '', `${pathname}/edit/${item?.info?.id}`)*/}
            {/*                                                  }}>*/}
            {/*                                    <p>*/}
            {/*                                        Edit*/}

            {/*                                    </p>*/}
            {/*                                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>*/}
            {/*                                </DropdownMenuItem>*/}
            {/*                                <DropdownMenuSeparator/>*/}

            {/*                                <>*/}
            {/*                                    <DropdownMenuItem*/}
            {/*                                        onClick={() => {*/}
            {/*                                            toast.error(`feature not enable!`)*/}
            {/*                                        }}*/}
            {/*                                        disabled={isPending}*/}
            {/*                                    >*/}
            {/*                                        Delete*/}
            {/*                                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>*/}
            {/*                                    </DropdownMenuItem>*/}
            {/*                                </>*/}

            {/*                            </DropdownMenuContent>*/}
            {/*                        </DropdownMenu>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Card.Grid>*/}
            {/*        ))}*/}

            {/*    </Card>*/}
            {/*</div>*/}
        </React.Suspense>
    )
}