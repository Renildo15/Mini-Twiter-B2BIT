'use client'

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useSearchParams } from "next/navigation";

type TabType = "login" | "register"
export default function Auth() {
    const searchParams = useSearchParams();
    const tabParams = searchParams.get('tab') as TabType;
    const [tab, setTab] = useState<TabType>(tabParams ? tabParams : "login")
    const handleTab = (tabName: TabType) => {
        setTab(tabName)
        switch(tab) {
            case "login":
                return <Login/>
            case "register":
                return <Register/>
            default:
                return <Login/>
        }
    }
    return (
        <>
            <h1 className="text-[#0D93F2] text-[40px] leading-[120%]">Mini Twitter</h1>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center border-b border-[#62748E]/20 mb-8">
                    <button onClick={() => handleTab("login")} 
                        className={`font-bold text-[16px] w-full pt-2 pb-3 border-b-2 cursor-pointer ${
                        tab === "login"
                            ? "text-[#0D93F2] border-[#0D93F2]"
                            : "text-[#62748E] border-transparent"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleTab("register")}
                        className={`font-bold text-[16px] w-full pt-2 pb-3 border-b-2 cursor-pointer ${
                            tab === "register"
                            ? "text-[#0D93F2] border-[#0D93F2]"
                            : "text-[#62748E] border-transparent"
                        }`}
                        >
                            Cadastrar
                    </button>
                </div>
                {tab === "login" && <Login />}
                {tab === "register" && <Register />}
            </div>
        </>
    )
}