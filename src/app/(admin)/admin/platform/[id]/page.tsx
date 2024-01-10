import {PlatformDetailTemplate} from "@/components/admin/platform/template/platform-detail-template";
import * as React from "react";
import {usePlatform} from "@/lib/hooks/use-platform";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number
    }
}
export default function PlatformDetailPage({params}:IParams) {
    return (
         <PlatformDetailTemplate params={params}/>
    )
}