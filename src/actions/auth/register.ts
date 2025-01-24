'use server';

import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { validateUser } from "@/schemas/validation/userValidation";
import { Role } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import { revalidatePath } from "next/cache";

export const registerUser = async (name: string, email: string, password: string, role: Role, companyId: string) => {


    if (!companyId) {
        return {
            ok: false,
            message: 'No se encontró el companyId en el header'
        };
    };



    const user: User = {
        name,
        password: bcryptjs.hashSync(password),
        email,
        role,
        companyId
    };

    const result = validateUser(user);

    if (!result.success) {
        return {
            ok: false,
            message: "Validation error",
            errors: result.error.errors
        };
    }

    try {


        const user = await prisma.user.create({
            data: result.data,
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
