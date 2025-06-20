'use server'

import { auth } from "@/auth.config";
import { Movements } from "@/interfaces/movement.interfaces";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { revalidatePath } from "next/cache";

export const newMovements = async ({
    movementsType,
    quantity,
    description,
    productId
}: Movements) => {
    const session = await auth();
    const companyId = session?.user.companyId

    if (!companyId) {
        return {
            ok: false,
        };
    }



    const movement = {
        type: movementsType,
        quantity,
        description,
        productId,
        companyId
    };

    try {

        await prisma.productMovement.create({
            data: movement
        });


        if (movementsType === 'Outbound') {
            await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    stock: {
                        decrement: quantity
                    }
                }
            });
        } else if (movementsType === 'Inbound') {
            await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    stock: {
                        increment: quantity
                    }
                }
            });
        }
        
        revalidatePath(ROUTES.PRODUCTS);
        return {
            ok: true,
            message: 'Movement created successfully.'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error trying to create movement.'
        }
    }
}