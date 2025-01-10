import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"


export const fetchCategoriesByCompany = async () => {
    const session = await auth();
    const companyId = session?.user.companyId


    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            },
            where: {
                companyId
            }
        })

        return categories

    } catch (error) {
        console.log('error', error)
        return []
    }


}
