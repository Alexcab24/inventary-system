'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { revalidatePath } from "next/cache";


export const updateProdut = async (
    id: string,
    name: string,
    price: number,
    stock: number,
    supplierId: string,
    categoryId: string,
    description: string,
    companyId: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {
        await prisma.products.update({
            where: {
                id: id
            },
            data: {
                name,
                price,
                stock,
                supplierId,
                categoryId,
                description,
                companyId,
            },
        })
        await prisma.productMovement.create({
            data: {
                type: "Adjustment",
                productId: id,
                companyId: companyId,
                quantity: stock

            }
        })
        revalidatePath(ROUTES.PRODUCTS);
        return {
            ok: true,
            message: 'Producto actualizado exitosamente'
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return {
            ok: false,
            message: 'Error al actualizar el producto',
        }
    }

}