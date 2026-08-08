import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
} from "next/font/google";

import { ThemeProvider } from "@/providers/ThemeProvider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans =
  Plus_Jakarta_Sans({
    variable:
      "--font-plus-jakarta",
    subsets: ["latin"],
  });

export const metadata: Metadata = {
  title:
    "CliniVerse | Nova AI Healthcare Assistant",
  description:
    "CliniVerse is an AI-powered healthcare assistant featuring Nova.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
        style={{
          fontFamily:
            "var(--font-inter), sans-serif",
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}