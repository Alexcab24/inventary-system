import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const fetchSupplierByCompany = async () => {
    const session = await auth();
    const companyId = session?.user.companyId

    try {
        const suppliers = await prisma.supplier.findMany({
            orderBy: {
                name: 'asc'
            },
            where: {
                companyId
            }
        })

        return suppliers

    } catch (error) {
        console.log(error);
        return [];
    }



}