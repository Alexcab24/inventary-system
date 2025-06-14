'use server';

import { Supplier } from "@/interfaces/supplier.interface";
import prisma from "@/lib/prisma";


export const getSupplierById = async (id: string): Promise<Supplier | null> => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                id
            }
        })

        if (!supplier) return null

        return {
            id: supplier?.id,
            name: supplier?.name,
            phone: supplier?.phone,
            email: supplier?.email,
            isActive: supplier?.isActive,
            address: supplier?.address,
            companyId: supplier?.companyId
        }
    } catch (error) {
        console.log(error)
        return null;
    }

}