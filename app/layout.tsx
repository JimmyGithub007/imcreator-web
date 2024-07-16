import type { Metadata } from "next";
import { Outfit, Spectral } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";
import { Shell } from "@/components";

const spectral = Spectral({ subsets: ["latin"], weight: '400' });

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
      <body className={spectral.className}>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>    
  </StoreProvider>);
}
