'use client'

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

type ScreenType = "login" | "register"
export default function Auth() {
    const [screen, setScreen] = useState<ScreenType>("login")
    const handleScreen = (screenName: ScreenType) => {
        setScreen(screenName)
        switch(screen) {
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
                    <button onClick={() => handleScreen("login")} 
                        className={`font-bold text-[16px] w-full pt-2 pb-3 border-b-2 cursor-pointer ${
                        screen === "login"
                            ? "text-[#0D93F2] border-[#0D93F2]"
                            : "text-[#62748E] border-transparent"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setScreen("register")}
                        className={`font-bold text-[16px] w-full pt-2 pb-3 border-b-2 cursor-pointer ${
                            screen === "register"
                            ? "text-[#0D93F2] border-[#0D93F2]"
                            : "text-[#62748E] border-transparent"
                        }`}
                        >
                            Cadastrar
                    </button>
                </div>
                {screen === "login" && <Login />}
                {screen === "register" && <Register />}
            </div>
        </>
    )
}