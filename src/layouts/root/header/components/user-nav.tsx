"use client"
import {Avatar} from 'antd';
import {useAuth} from "@/lib/hooks/use-auth";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import {toast} from "react-hot-toast";
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/common/ui/dropdown-menu"
import * as React from "react";
import {useRouter} from "next/navigation";
import {catchError} from "@/lib/helpers";
import { useMounted } from "@/lib/hooks/use-mounted"


export default function UserNav() {
    const {profile, auth, setAuth} = useAuth();
    const router = useRouter()
    const [_, startTransition] = React.useTransition()
    const mounted = useMounted();

    const handleLogout = () => {
        startTransition(async () => {
            try {
                await setAuth(null);
                toast.success('logout successful..');
                router.push(`${window.location.origin}`)
            } catch (err) {
                catchError(err)
            }

        })
    };

    return (
        <div className=" opacity-1 text-black cursor-pointer">
            {auth && mounted ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar
                                size="large"
                                src={profile?.images ? profile?.images : fallbackImg}
                                srcSet={fallbackImg}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{profile?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {profile?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile/account')}>
                                    Profile
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile/platforms')}>
                                    Your Platforms
                                    <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin')}>
                                    Dashboard
                                    <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <div onClick={handleLogout} className="cursor-pointer">
                                    Log out
                                </div>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </>
            ) : (
                <Link href="/signin" className="transition  ease-in-out delay-150  p-2 rounded uppercase text-[13px] font-semibold bg-transparent px-5 border border-[#16a1ff] text-[#223b55]
                    hover:bg-blue-500 hover:text-white
                 ">
                    Login
                </Link>
            )}
        </div>
    )
}