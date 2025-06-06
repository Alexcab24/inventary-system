'use server';

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { validateProduct } from "@/schemas/validation/productValidation";
import { revalidatePath } from "next/cache";


export const createProduct = async (
    name: string,
    price: number,
    stock: number,
    supplierId: string,
    categoryId: string,
    description: string,
    companyId: string
) => {

    if (!companyId) {
        return {
            ok: false,
        };
    }

    const product: Product = {
        name,
        price,
        stock,
        supplierId,
        categoryId,
        description,
        companyId,
    };

    const result = validateProduct(product);

    if (!result.success) {
        return {
            ok: false,
            message: "Validation error",
            errors: result.error.errors
        };
    }


    try {
        const newProduct = await prisma.products.create({
            data: result.data,
            select: {
                id: true,
                name: true
            }
        });

        await prisma.productMovement.create({
            data: {
                type: 'Inbound',
                productId: newProduct.id,
                companyId: companyId
            }
        });

        revalidatePath(ROUTES.PRODUCTS);

        return {
            ok: true,
            message: 'Producto creado con éxito',
            newProduct

        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error a crear producto'
        }
    }
}