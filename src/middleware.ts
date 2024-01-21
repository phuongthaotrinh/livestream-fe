import {NextResponse} from "next/server"
import type { NextRequest } from 'next/server'
import {useAuth} from "@/lib/hooks/use-auth"


export function middleware(request: NextRequest) {
    // const currentUser = request.cookies.get('currentUser')?.value
    //
    // if (currentUser) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
    // return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}