import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Moise - Next.js Developer | Full-Stack Engineer",
  description:
    "Portfolio of Alex Moise, experienced Next.js and React developer specializing in full-stack web applications.",
  metadataBase: new URL("https://alexandru-moise.com"),
  keywords: [
    "Next.js developer",
    "React developer",
    "Full-stack engineer",
    "TypeScript",
    "Web development",
  ],
  authors: [{ name: "Alex Moise" }],
  openGraph: {
    title: "Alex Moise - Next.js Developer",
    description:
      "Interactive desktop OS portfolio showcasing full-stack development skills",
    url: "https://alexandru-moise.com",
    siteName: "CYPHER OS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CYPHER OS Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Moise - Developer",
    description: "Interactive desktop OS portfolio",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
