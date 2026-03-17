'use client'
import React, { forwardRef, InputHTMLAttributes } from "react";

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: "text" | "password" | "email";
    placeholder: string;
    children?: React.ReactNode;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, IAuthInputProps>(
    ({ label, children, placeholder, type, error, disabled, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-[#62748E] text-[14px] leading-5">
                    {label}
                </label>
                
                <div 
                    className={`
                        flex rounded-lg p-4 bg-white border w-full 
                        transition-all duration-200
                        ${error 
                            ? 'border-red-500 focus-within:border-red-500' 
                            : 'border-[#E2E8F0] focus-within:border-[#0D93F2]'
                        }
                        ${disabled 
                            ? 'bg-gray-50 opacity-60 cursor-not-allowed' 
                            : 'hover:border-[#0D93F2]'
                        }
                        ${className || ''}
                    `}
                >
                    <input 
                        type={type}
                        ref={ref}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`
                            text-[#62748E] w-full outline-none bg-transparent
                            placeholder:text-[#94A3B8] placeholder:text-sm
                            ${disabled ? 'cursor-not-allowed' : ''}
                        `}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${props.id}-error` : undefined}
                        {...props}
                    />
                    
                    {children && (
                        <span className={`flex items-center ${error ? 'text-red-500' : ''}`}>
                            {children}
                        </span>
                    )}
                </div>
                
                {error && (
                    <span 
                        id={`${props.id}-error`}
                        className="text-red-500 text-xs mt-1 animate-fadeIn"
                        role="alert"
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;