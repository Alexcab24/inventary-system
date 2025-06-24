import { auth } from "@/auth.config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";



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

    if (session?.user) {
        redirect('/dashboard')
    }


    return (
        <html lang="es">
            <body className={inter.className}>
                <main className="bg-gray-100">
                    {children}
                </main>
            </body>
        </html>
    );
}
