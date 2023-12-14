import {HeroBanner} from "@/components/root/hero-banner"


export default function RootPage({children}:{children:React.ReactNode}) {
    return (
        <div>
            <div className="h-12 border border-red-200">
                <HeroBanner />
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}