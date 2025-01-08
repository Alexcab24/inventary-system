'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addProduct = async (name: string, price: number, stock: number, supplierId: string, description: string, companyId: string) => {



    try {
        if (!companyId) {
            return {
                ok: false,
            };
        }

        const product = await prisma.products.create({
            data: {
                name,
                price,
                stock: stock,
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
            product,
            message: 'Producto creado con éxito',
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error a crear producto'
        }
    }
}