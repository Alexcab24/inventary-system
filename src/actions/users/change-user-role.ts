'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const ChangeUserRole = async (userId: string, role: 'admin' | 'user' | 'contador') => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {
      
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            }
        });

        revalidatePath('/management/users');

        return {
            ok: true,
            message: 'Usuario ha sido actualizado con éxito. Debe iniciar sesión nuevamente.'
        }

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar el usuario'
        }
    }
}
