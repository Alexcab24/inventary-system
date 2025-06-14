'use server'

import { auth } from "@/auth.config";
import { Category } from "@/interfaces/category.interfaces";
import prisma from "@/lib/prisma";
import { validateCategory } from "@/schemas/validation/categoryValidation";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string) => {

    const session = await auth();
    const companyId = session?.user.companyId

    if (!companyId) {
        return {
            ok: false,
        };
    }


    const category: Category = {
        name,
        isActive: true,
        // companyId,
    };

    const result = validateCategory(category);

    if (!result.success) {
        return {
            ok: false,
            message: "Validation error",
            errors: result.error.errors
        };
    }

    try {
        await prisma.category.create({
            data: result.data
        });

        revalidatePath('/inventory/create');

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