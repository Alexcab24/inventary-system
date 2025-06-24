'use server';

import { Supplier } from "@/interfaces/supplier.interface";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { validateSupplier } from "@/schemas/validation/supplierValidation";
import { revalidatePath } from "next/cache";



export const createSupplier = async (
    name: string,
    phone: string,
    email: string,
    address: string,
    companyId: string
) => {


    if (!companyId) {
        return {
            ok: false,
        };
    }

    const supplier: Supplier = {
        name,
        phone,
        email,
        address,
        companyId,
        isActive: true,
    };


    const result = validateSupplier(supplier);

    if (!result.success) {
        return {
            ok: false,
            message: "Validation error",
            errors: result.error.errors
        };
    }

    try {
        const newSupplier = await prisma.supplier.create({
            data: {
                name,
                phone,
                email,
                address,
                companyId
            },
            select: {
                id: true,
                name: true
            }
        })

        revalidatePath(ROUTES.SUPPLIER);
        return {
            ok: true,
            message: 'Supplier successfully created',
            newSupplier
        }
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Error creating supplier'
        }
    }

}