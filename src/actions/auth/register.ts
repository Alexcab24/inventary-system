'use server';

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import { revalidatePath } from "next/cache";

export const registerUser = async (name: string, email: string, password: string, role: Role, companyId: string) => {
    try {
        if (!companyId) {
            return {
                ok: false,
                message: 'No se encontró el companyId en el header'
            };
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
                role: role,
                companyId: companyId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });


        revalidatePath('/management/users');

        return {
            ok: true,
            user,
            message: 'Usuario creado con éxito',

        }




    } catch (error) {
        return {
            ok: false,
            message: 'Error al crear el usuario'
        }
    }
};
