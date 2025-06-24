'use server'

import { auth } from "@/auth.config";
import { Category } from "@/interfaces/category.interfaces";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
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


    const category = {
        name,
        companyId,
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

        revalidatePath(ROUTES.CREATE_PRODUCT);

        return {
            ok: true,
            message: 'Category created successfully'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error trying to create category'
        }
    }
}