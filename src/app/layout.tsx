import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory System",
  description: "Sistema de gestión de inventario",
  icons: {
    icon: "/favicon-inventory.svg"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>

  );
}
