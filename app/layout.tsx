import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvider";
import { Shell } from "@/components";
import "./globals.css";

const spectral = Spectral({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  metadataBase: new URL("https://imcreator.asia/assets/seo/seoBG.jpg"),
  title: "IMCREATOR - ONE STOP PRITING SOLUTION IN JOHOR BAHRU",
  description: "A Clothing Supplier (JB), provide clothing printing and custom design service in Johor Bahru. Our mission is to offer you a seamless and enjoyable experience as you design unique t-shirts, hoodies, caps, office uniforms, and more.",
  openGraph: {
    title: "IMCREATOR - ONE STOP PRITING SOLUTION IN JOHOR BAHRU",
    description: "A Clothing Supplier (JB), provide clothing printing and custom design service in Johor Bahru. Our mission is to offer you a seamless and enjoyable experience as you design unique t-shirts, hoodies, caps, office uniforms, and more.",
    type: "website",
    locale: "en_US",
    url: "https://imcreator.asia/",
    siteName: "ImCreator"
  }
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
