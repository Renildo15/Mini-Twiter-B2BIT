import React from "react";

interface IAuthInputProps {
    label: string;
    type: "text" | "password";
    placeholder: string;
    children?: React.ReactNode;
}

export default function AuthInput({label, children, placeholder, type} :IAuthInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[#62748E] text-[14px] leading-5" htmlFor="">{label}</label>
            <div className="flex rounded-lg p-4 bg-white border border-[#E2E8F0] w-full focus-within:border-[#0D93F2] transition-all">
                <input 
                    type={type}
                    placeholder={placeholder}
                    className="text-[#62748E] w-full outline-none bg-transparent" 
                />
                {children}
            </div>
        </div>
    )
}