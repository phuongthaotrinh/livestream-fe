'use client'
import { useContext } from "react";
import AuthContext from "@/lib/context/AuthProvider";
import {useAuth} from "@/lib/hooks/use-auth";
import {Card} from "antd";

export default  function RootPage() {

    const {auth } = useAuth()
    const platforms = JSON.parse(localStorage.getItem('flatforms')!);
    console.log(platforms);

    return (
        <div>
            <p>Đăng ký thông tin nền tảng</p>
            <div>
                <Card title={<>
                    <img src={platforms.images} className="w-12 h-12 object-cover"/>
                    <div>
                        {platforms.name}
                    </div>
                </>}>
                        <div className="card-content">
                            <>

                            </>
                        </div>
                </Card>
            </div>

        </div>
    )
}