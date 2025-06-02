import { auth } from "@/auth.config";
import PrelineScript from "@/components/PrelineScript";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import AppLayoutClient from "@/components/ui/management_layout/AppLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export default async function ManagementLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login')
  }
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppLayoutClient user={session.user}>
            {children}
        </AppLayoutClient>
        <PrelineScript />
      </body>
    </html>
  );
}