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
  title: "TechStore — MercadoPago Checkout Pro",
  description: "Tienda de electrónica con integración de MercadoPago Checkout Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
        <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              TechStore
            </a>
            <span className="text-sm text-zinc-500">Powered by MercadoPago</span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-200 bg-white py-4 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
          © {new Date().getFullYear()} TechStore — Integración MercadoPago Checkout Pro
        </footer>
      </body>
    </html>
  );
}
