import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../globals.css';
import LayoutBase from '@/src/components/LayoutBase';
import Header from '@/src/components/Main/Header';
import Footer from '@/src/components/Main/Footer';
import ReactQueryProvider from '@/src/provider/react-query-provider';
import { AuthProvider } from '@/src/provider/auth-provider';
import { RouteGuard } from '@/src/components/RouteGuard';

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
      <body className={`${manrope.variable} antialiased bg-[#FAFAFA]`}>
        <AuthProvider>
          <RouteGuard>
            <ReactQueryProvider>
              <Header />
              <LayoutBase isTimeline={true}>{children}</LayoutBase>
            </ReactQueryProvider>
            <Footer />
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
