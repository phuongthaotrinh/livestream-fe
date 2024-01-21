'use client';

import * as React from "react";
import {PageHeader} from "@/components/common/page-header";
import {SliderShell} from "@/components/shells/slider-shell"
import  {useApiAdditional} from "@/_actions/additional"
export default function Sliders() {
    const [pending, startTransition] = React.useTransition();
    const [sliders, setSliders] = React.useState([]);
    const {getSliders} = useApiAdditional();

    React.useEffect(() => {
        startTransition(() => {
            const fetchData = async () => {
                try {
                    const {data} = await getSliders();
                  setSliders(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            };
            fetchData();
        });
    }, []);
    return (
        <>
            <PageHeader title="Slider" desc="Mangerment slider here"/>
            <div className="my-6">
                {!pending && sliders && (
                    <SliderShell data={sliders} pageCount={1} /> )}
            </div>
        </>
    )
}