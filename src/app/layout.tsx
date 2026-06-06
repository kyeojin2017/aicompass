import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Compass",
  description: "AI 레벨 테스트와 맞춤 학습 로드맵을 제공하는 교육 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
