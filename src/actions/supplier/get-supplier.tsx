import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const fetchSupplierByCompany = async () => {
    const session = await auth()

    // if (!session?.user) {
    //     return {
    //         ok: false,
    //         message: 'Debe de estar autenticado'
    //     }
    // };

    try {
        const suppliers = await prisma.supplier.findMany({
            orderBy: {
                name: 'asc'
            },
            where: {
                companyId: session?.user.companyId
            }
        })

        return suppliers

    } catch (error) {
        console.log(error);
        return [];
    }



}