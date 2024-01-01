
export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <div >

            <main className="container w-full h-full min-w-[18rem] ">
                {children}
            </main>
        </div>
    )
}
