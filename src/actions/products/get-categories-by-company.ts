import { auth } from "@/auth.config"
import { PaginatedItemProps } from "@/interfaces/app.interfaces";
import prisma from "@/lib/prisma"



export const getCategoriesByCompany = async ({
    page = 1,
    take = 6,
    query
}: PaginatedItemProps) => {

    //Validaciones de page
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    };

    try {
        const categories = await prisma.category.findMany({
            take: take,
            skip: (page - 1) * take,
            select: {
                id: true,
                name: true,
                isActive: true,
                _count: {
                    select: {
                        Products: true
                    }
                }
            },
            where: {
                companyId: session.user.companyId,
                OR: [
                    {
                        name: {
                            contains: query.trim(),
                            mode: 'insensitive',
                        },
                    },
                    {
                        id: {
                            contains: query.trim(),
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            orderBy: {
                name: "asc"
            }
        })

        const formattedCategories = categories.map(category => ({
            id: category.id,
            name: category.name,
            isActive: category.isActive,
            products: category._count.Products
        }));

        const totalCount = await prisma.category.count({
            where: {
                companyId: session.user.companyId
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages: totalPages,
            categories: formattedCategories
        };

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return {
            ok: false,
            message: 'Error al obtener los usuarios'
        };
    }







}













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
