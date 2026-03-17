'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/src/provider/auth-provider'


const publicRoutes = ['/login', '/auth', '/']
const guestOnlyRoutes = ['/login', '/auth']

interface RouteGuardProps {
    children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isLoading) return

        const isGuestRoute = guestOnlyRoutes.includes(pathname)
        
        if (isAuthenticated && isGuestRoute) {
            console.log('Usuário logado tentando acessar rota de guest, redirecionando para home')
            router.push('/')
            return
        }

        if (!isAuthenticated && !publicRoutes.includes(pathname)) {
            console.log('Usuário não logado tentando acessar rota protegida, redirecionando para login')
            router.push(`/login?from=${encodeURIComponent(pathname)}`)
            return
        }
        
    }, [isAuthenticated, isLoading, pathname, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#0D93F2] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#62748E]">Carregando...</p>
                </div>
            </div>
        )
    }

    const isGuestRoute = guestOnlyRoutes.includes(pathname)
    
    if (isAuthenticated && isGuestRoute) {
        return null
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return null
    }

    return <>{children}</>
}