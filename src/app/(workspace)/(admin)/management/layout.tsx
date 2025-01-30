import { auth } from "@/auth.config";
import PrelineScript from "@/components/PrelineScript";
import { TopMenu } from "@/components/ui/main_layout/TopMenu";
import { SideBar } from "@/components/ui/management_layout/SideBar";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";


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
        <SideBar />
        {/* Main Layout content - Contenido principal del Layout */}
        <div className="ml-auto  mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">

          <TopMenu user={session.user} />


          {/* TODO: Contenido en el Layout.tsx */}
          <div className="px-6 pt-14 lg:pt-6 bg-white p-2 pb-5 m-2 rounded">

            {children}

          </div>
        </div>
        <PrelineScript />
      </body>
    </html>
  );
}