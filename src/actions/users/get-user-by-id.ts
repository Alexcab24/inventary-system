'use server';

import prisma from "@/lib/prisma";
import { UserById } from "@/interfaces";
import { Role } from '../../interfaces/user.interfaces';

export const getUserById = async (id: string): Promise<UserById | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });


        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Role
        };
    } catch (error) {
        console.error(error);
        return null
    }
};
