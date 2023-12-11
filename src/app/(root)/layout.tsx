
export default function RootPage({children}:{children:React.ReactNode}) {
    return (
        <div>
            <div className="h-12 border border-red-200">
                This is navbar
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}