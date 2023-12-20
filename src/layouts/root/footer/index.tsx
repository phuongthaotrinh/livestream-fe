import {} from "lucide-react";
import {Icons} from "@/components/common/icons"
import Link from "next/link"

export function Footer() {
    return (
        <footer className={` container bg-white  pb-16 space-y-8`}>
           <div className="flex gap-6 text-center justify-center items-center">
               <Link href="/" className="block">
                   <Icons.facebookSolid className="w-6 h-6"/>
               </Link>
               <Link href="/"  className="block">
                   <Icons.mailSolid className="w-6 h-6"/>
               </Link>
               <Link href="/" className="block">
                   <Icons.facebookSolid className="w-6 h-6"/>
               </Link>
               <Link href="/"  className="block">
                   <Icons.mailSolid className="w-6 h-6"/>
               </Link>
           </div>
            <div className="text-center">
                <img className="inline-block" src="http://wpdemo.vegatheme.com/icos-jasmine/wp-content/uploads/sites/20/2018/06/logo-dark-big.png" alt=""/>
            </div>
            <div className="copy-right text-center text-sm text-slate-500 ">
                Copyright © 2018, Cryptico Theme Made By OceanThemes & Handcrafted by iO.<br />
                All trademarks and copyrights belong to their respective owners.
            </div>
        </footer>
    )
}