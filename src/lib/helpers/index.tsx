import * as z from "zod";
import { toast } from "react-hot-toast"

export function catchError(err: unknown) {
    if (err instanceof z.ZodError) {
        const errors = err.issues.map((issue) => {
            return issue.message
        })
        return toast(errors.join("\n"))
    } else if (err instanceof Error) {
        return toast(err.message)
    } else {
        return toast("Something went wrong, please try again later.")
    }
}

export function formatDate(date: Date | string | number) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date))
}


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}