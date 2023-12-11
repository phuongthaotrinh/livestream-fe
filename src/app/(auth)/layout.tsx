
export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <div >

            <main className="container w-full h-full ">
                {children}
            </main>
        </div>
    )
}
