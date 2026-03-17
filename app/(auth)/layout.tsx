import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import LayoutBase from "@/src/components/LayoutBase";


const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});


export const metadata: Metadata = {
  title: "Mini Twitter",
  description: "Mini Twitter",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <LayoutBase>
          {children}
        </LayoutBase>
      </body>
    </html>
  );
}