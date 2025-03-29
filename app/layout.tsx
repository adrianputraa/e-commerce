import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme"
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalStateProvider } from "@/lib/context/modal-state";
import { AuthDialog } from "@/components/modal/auth";
import { AuthRegistrationDialog } from "@/components/modal/register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-commerce app",
  description: "@aesaprofiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModalStateProvider>
            {children}  
            <Toaster/>
            <AuthDialog hidden />
            <AuthRegistrationDialog hidden />
          </ModalStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
