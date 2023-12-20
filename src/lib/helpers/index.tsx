import * as z from "zod";
import {toast} from "react-hot-toast"
import {usePathname} from "next/navigation";
import * as React from "react";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect";

export function catchError(err: unknown) {
    if (err instanceof z.ZodError) {
        const errors = err.issues.map((issue) => {
            return issue.message
        })
        return toast.error(errors.join("\n"))
    } else if (err instanceof Error) {
        return toast.error(err.message)
    } else {
        return toast.error("Something went wrong, please try again later.")
    }
}

export function formatDate(date: Date | string | number) {
    if (date) {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date))
    } else return


}


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}

export const useGetLastPath = () => {
    const [newPath, setnewPath] = React.useState("");
    const pathname = usePathname();
    useIsomorphicLayoutEffect(() => {
        const paths = pathname.split('/');
        console.log('oath', paths,paths[paths.length -1])
            setnewPath(paths[paths.length -1]);

    }, [pathname])
    return newPath
}