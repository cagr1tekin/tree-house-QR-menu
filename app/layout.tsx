import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tree House",
      icons: {
  icon: "favicon.ico",
  },
  openGraph: {
    title: "Tree House",
    url: "https://treehousebalikesir.com",
    siteName: "Tree House",
    images: [
      {
        url: "/image.png", // senin yükleyeceğin foto
        width: 1200,
        height: 630,
        alt: "Tree House",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
