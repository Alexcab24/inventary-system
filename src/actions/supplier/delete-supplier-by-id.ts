'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const deleteSupplierById = async (id: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Necesita ser adminitrador para completar esta acción'
        }
    };


    if (session?.user.id === id) {
        return {
            ok: false,
            message: 'Acción no permitida: no puedes eliminar tu propio usuario.'
        }
    };

    try {
        await prisma.supplier.delete({
            where: {
                id
            }
        });
        revalidatePath('/supplier');
        return {
            ok: true,
            message: 'Supplidor eliminado con éxito'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al intentar eliminar el Supplidor'
        }
    }

}