'use server';

import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcryptjs from 'bcryptjs';



export const registerUser = async (name: string, email: string, password: string, role: Role, companyId: string) => {


    try {
        // const companyId = req.headers.get('x-company-id');


        if (!companyId) {
            return {
                ok: false,
                message: 'No se encontró el companyId en el header.'
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
        })

        return {
            ok: true,
            user,
            message: 'Usuario creado'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear al usuario'
        }
    }
}