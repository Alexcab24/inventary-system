'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string) => {

    const session = await auth();
    const companyId = session?.user.companyId

    if (!companyId) {
        return {
            ok: false,
        };
    }
    console.log('funciona la vaina', name)

    try {
        await prisma.category.create({
            data: {
                name,
                companyId
            }
        });

        revalidatePath('/dashboard/inventory/add');

        return {
            ok: true,
            message: 'Categoría creada correctamente'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al intentar crear cartegoría'
        }
    }
}