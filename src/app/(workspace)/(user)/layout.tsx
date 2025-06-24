import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/components/PrelineScript";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import AppLayoutClient from "@/components/ui/main_layout/AppLayoutClient";
import { GetProfilePic } from "@/actions/profile/get-profile-by-id";
import { ROUTES } from "@/router/routes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory System",
  description: "Inventory System description",
  icons: {
    icon: "/favicon-inventory.svg"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect(ROUTES.LOGIN)
  }

  const resp = await GetProfilePic(session.user.id);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayoutClient
          user={session.user}
          profilePic={resp?.image || ''}
        >
          {children}
        </AppLayoutClient>
        <PrelineScript />
      </body>
    </html>
  );
}
