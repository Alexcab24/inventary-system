import { auth } from "@/auth.config"
import { PaginatedItemProps } from "@/interfaces/app.interfaces";
import prisma from "@/lib/prisma"



export const getSupplierByCompany = async ({
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
        const suppliers = await prisma.supplier.findMany({
            take: take,
            skip: (page - 1) * take,

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
                        name: {
                            contains: query.trim(),
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            orderBy: {
                name: 'asc',
            },

        })

        const totalCount = await prisma.supplier.count({
            where: {
                companyId: session.user.companyId
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages: totalPages,
            suppliers
        }

    } catch (error) {
        console.error("Error al obtener los suplidores:", error);
        return {
            ok: false,
            message: 'Error al obtener los suplidores'
        }
    }
};






export const fetchSupplierByCompany = async () => {
    const session = await auth();
    const companyId = session?.user.companyId;

    const suppliers = await prisma.supplier.findMany({
        orderBy: {
            name: 'asc',
        },
        where: {
            companyId,
        },
    });


    return {
        suppliers
    }

};
