import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";
import { Shell } from "@/components";

const outfit = Outfit({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "IMCREATOR",
  description: "IMCREATOR LANDING PAGE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<StoreProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>    
  </StoreProvider>);
}
