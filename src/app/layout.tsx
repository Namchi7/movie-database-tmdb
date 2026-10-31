import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NextUIProvider } from "@nextui-org/system";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Self-hosted from @fontsource/poppins so builds don't depend on reaching
// Google Fonts. Only the weights the UI uses (normal/medium/semibold/bold).
const poppins = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/poppins/files/poppins-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Movie Database",
  description: "Get All Movies and TV Shows Details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <NextUIProvider>
          <Header />
          {children}
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
