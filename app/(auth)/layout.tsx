import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../globals.css';
import LayoutBase from '@/src/components/LayoutBase';
import ReactQueryProvider from '@/src/provider/react-query-provider';
import { RouteGuard } from '@/src/components/RouteGuard';
import { AuthProvider } from '@/src/provider/auth-provider';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Mini Twitter',
  description: 'Mini Twitter',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${manrope.variable} antialiased`}>
        <LayoutBase>
          <ReactQueryProvider>
            <AuthProvider>
              <RouteGuard>{children}</RouteGuard>
            </AuthProvider>
          </ReactQueryProvider>
        </LayoutBase>
      </body>
    </html>
  );
}
