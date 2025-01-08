'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addProduct = async (
    name: string,
    price: number,
    stock: number,
    supplierId: string,
    description: string,
    companyId: string
) => {

    if (!companyId) {
        return {
            ok: false,
        };
    }


    try {

        const product = await prisma.products.create({
            data: {
                name,
                price,
                stock,
                description,
                supplierId,
                companyId

            },
            select: {
                id: true,
                name: true
            }
        });

        revalidatePath('/dashboard/inventory')

        return {
            ok: true,
            message: 'Producto creado con éxito',
            product

        }

    } catch (error) {

        return {
            ok: false,
            message: 'Error a crear producto'
        }
    }
}