
import RootPageTemplate from "@/components/root/home/template";

import type { Metadata } from "next"


export const metadata: Metadata = {
    title: "Home",
    description: "make streaming easier with us",
}

export default function RootPage() {
    return (
       <RootPageTemplate />
    )
}