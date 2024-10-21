'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const toggleUserAvailability = async (userId: string, disabled: boolean) => {

    const message = disabled ? 'Usuario ha sido habilitado con éxito' : 'Usuario ha sido deshabilitado con éxito'

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Necesita ser adminitrador para completar esta acción'
        }
    };

    if (session?.user.id === userId) {
        return {
            ok: false,
            message: 'Acción no permitida: no puedes deshabilitar tu usuario.'
        }
    }

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                disabled: !disabled
            }
        })
        revalidatePath('/management/users')

        return {
            ok: true,
            message: message
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Hubo un error al completar esta acción'
        }
    }

}