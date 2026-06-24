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

export const metadata: Metadata = {
  title: "에듀캠퍼스 | 나만의 교육용 웹앱",
  description: "누구나 쉽게 만들고 배우는 교육용 웹 서비스 뼈대 프로젝트입니다. 즉시 배포 가능하고 다양한 교육 기능을 추가할 수 있는 뼈대 코드입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col bg-gradient-to-tr from-slate-50 to-slate-100 text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
