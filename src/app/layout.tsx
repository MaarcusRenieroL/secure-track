import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { OnboardingProtected } from "@/components/protected/OnboardingProtected";
import { SocketIndicator } from "@/components/alert-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <OnboardingProtected />
          {children}
          <SocketIndicator />
        </Providers>
      </body>
    </html>
  );
}
