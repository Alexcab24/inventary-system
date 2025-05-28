import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/components/PrelineScript";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import AppLayoutClient from "@/components/ui/main_layout/AppLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventary System",
  description: "Inventary System description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayoutClient user={session.user}>
          {children}
        </AppLayoutClient>
        <PrelineScript />
      </body>
    </html>
  );
}
