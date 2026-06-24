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
  title: "EduCampus Quiz | 교육용 퀴즈 도구",
  description: "학생들이 직접 풀고 점수를 확인하는 교육용 퀴즈 앱입니다. 결과가 Supabase에 저장되어 교사가 확인할 수 있습니다.",
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
