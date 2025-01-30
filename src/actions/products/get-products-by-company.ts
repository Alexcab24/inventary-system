import { auth } from "@/auth.config";
import { PaginatedItemProps } from "@/interfaces/app.interfaces";
import prisma from "@/lib/prisma";

export const getProductsByCompany = async ({
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
        const products = await prisma.products.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                supplier: true,
                category: true
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
                        name: {
                            contains: query.trim(),
                            mode: 'insensitive',
                        },
                    },
                    {
                        category: {
                            name: {
                                contains: query.trim(),
                                mode: 'insensitive'
                            }
                        }
                    }
                ],
            },
            orderBy: {
                name: 'asc',
            },

        })

        const totalCount = await prisma.products.count({
            where: {
                companyId: session.user.companyId
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages: totalPages,
            products
        }

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return {
            ok: false,
            message: 'Error al obtener los productos'
        }
    }




}



export const fetchProductByCompany = async () => {

    const session = await auth()

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    };


    const products = await prisma.products.findMany({
        where: {
            companyId: session.user.companyId
        }
    })

    return {

        products
    }
}


type ProductGroupResponse = {
    ok: boolean;
    message?: string;
    data?: { month: string; count: number }[];
};

export const fetchProductsGroupedByMonth = async (): Promise<ProductGroupResponse> => {
    const session = await auth();
  
    if (!session?.user) {
      return { ok: false, message: "Debe estar autenticado" };
    }
  
    try {
      const groupedData = await prisma.$queryRaw<{ month: string; count: number }[]>`
        SELECT 
          TO_CHAR("createdAt", 'FMMonth') AS month,
          COUNT(*)::int
        FROM "Products"
        WHERE "companyId" = ${session.user.companyId}
        GROUP BY month
        ORDER BY MIN(EXTRACT(MONTH FROM "createdAt"))`;
  
      return { ok: true, data: groupedData };
    } catch (error) {
      console.error(error);
      return { ok: false, message: "Error al obtener los datos" };
    }
  };


