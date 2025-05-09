import type { Metadata } from "next";
import { Kosugi_Maru, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { PostProvider } from "@/context/PostContext";
import { PageTransition } from "@/components/PageTransition";

const kosugiMaru = Kosugi_Maru({
  variable: "--font-kosugi-maru",
  subsets: ["latin"],
  weight: "400",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Encore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kosugiMaru.variable} ${notoSansJP.variable} antialiased bg-[#FFFCEB]`}
      >
        <PostProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </PostProvider>
      </body>
    </html>
  );
}
