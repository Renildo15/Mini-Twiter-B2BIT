import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../globals.css';
import LayoutBase from '@/src/components/LayoutBase';
import Header from '@/src/components/Main/Header';
import Footer from '@/src/components/Main/Footer';
import ReactQueryProvider from '@/src/provider/react-query-provider';
import { AuthProvider } from '@/src/provider/auth-provider';
import { RouteGuard } from '@/src/components/RouteGuard';
import { SearchProvider } from '@/src/provider/search-provider';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Mini Twitter',
  description: 'Mini Twitter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${manrope.variable} antialiased bg-[#FAFAFA] dark:bg-linear-to-b dark:from-[#0F172B] dark:to-[#070B14]`}
      >
        <AuthProvider>
          <RouteGuard>
            <ReactQueryProvider>
              <SearchProvider>
                <Header />
                <LayoutBase isTimeline={true}>{children}</LayoutBase>
              </SearchProvider>
            </ReactQueryProvider>
            <Footer />
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
