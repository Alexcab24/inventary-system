'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateSupplier = async (
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string
) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {
        await prisma.supplier.update({
            where: {
                id
            },
            data: {
                id,
                name,
                email,
                phone,
                address
            }
        })

        revalidatePath('/dashboard/suppliers');
        return {
            ok: true,
            message: 'Proveedor actualizado exitosamente'
        }
    } catch (error) {
        console.error("Error al actualizar el proovedor:", error);
        return {
            ok: false,
            message: 'Error al actualizar el proveedor',
        }
    }

}