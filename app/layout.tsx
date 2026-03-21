import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hub-IO",
  description:
    "Generate a stable contributor SVG link for any public GitHub repository and drop it into your README.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${display.variable} ${mono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
        <Toaster theme="light" richColors position="top-center" />
      </body>
    </html>
  );
}
