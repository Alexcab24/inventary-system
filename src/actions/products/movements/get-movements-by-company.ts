import { auth } from "@/auth.config";
import { PaginatedItemProps } from "@/interfaces/app.interfaces";
import prisma from "@/lib/prisma";



export const getProductsMovementsByCompany = async ({
    page = 1,
    take = 6,
    query }: PaginatedItemProps) => {


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
        const productsMovements = await prisma.productMovement.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                product: true
            },
            where: {
                companyId: session.user.companyId,
                OR: [
                    {
                        id: {
                            contains: query.trim(),
                            mode: 'insensitive'
                        }
                    },
                    {
                        product: {
                            name: {
                                contains: query.trim(),
                                mode: 'insensitive'
                            },
                        }
                    }

                ],
            },
            orderBy: {
                product: {
                    name: 'asc'
                }
            },

        })

        // const formattedProducts = products.map(product => ({
        //     ...product,
        //     price: product.price.toNumber()
        // }));

        const totalCount = await prisma.productMovement.count({
            where: {
                companyId: session.user.companyId
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages: totalPages,
            productsMovements
        }

    } catch (error) {
        console.error("Error al obtener los movimientos de producos:", error);
        return {
            ok: false,
            message: 'Error al obtener los productos'
        }
    }




}