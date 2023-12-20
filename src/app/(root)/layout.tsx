
import {Header} from "@/layouts/root/header";
import {Footer} from "@/layouts/root/footer";

export default function RootPage({children}: { children: React.ReactNode }) {

    return (
        <div>
            <div className="w-full overflow-hidden">
                <Header/>
            </div>
            <div className="relative bg-white min-h-screen">
                {children}
            </div>

            <div className='relative bg-white h-auto'>
                <Footer/>
            </div>
        </div>
    )
}