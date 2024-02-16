import {PageHeader} from "@/components/common/page-header";
import {SliderShell} from "@/components/shells/slider-shell"
import {DataTableSkeleton} from "@/components/common/skeleton/table-skeleton";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Admin| Sliders",
    description: "make streaming easier with us",
}
export default function Sliders() {
    return (
        <>
            <PageHeader title="Slider" desc="Mangerment slider here"/>
            <div className="my-6">
            <SliderShell />
            </div>
        </>
    )
}