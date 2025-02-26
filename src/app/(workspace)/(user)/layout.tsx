import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideBar } from "@/components/ui/main_layout/SideBar";
import PrelineScript from "@/components/PrelineScript";
import { TopMenu } from "@/components/ui/main_layout/TopMenu";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


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
    <html lang="es">
      <body className={inter.className} style={{backgroundColor: "#F8FAFC"}}>
        <SideBar />
        {/* Main Layout content - Contenido principal del Layout */}
        <div className="ml-auto  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen ">

          <TopMenu user={session.user} />


          {/* TODO: Contenido en el Layout.tsx */}
          <div className="px-6 pt-14 lg:pt-6 p-2 pb-5 m-2 rounded">

            {children}

          </div>
        </div>
        <PrelineScript />
      </body>
    </html>
  );
}
