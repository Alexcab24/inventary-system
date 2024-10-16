'use server';

import prisma from "@/lib/prisma";
import { UserById } from "@/interfaces"; 
import { Role, User } from '../../interfaces/user.interfaces';

export const getUserById = async (id: string): Promise<UserById | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
                role: true
            }
        });

     
        if (!user) {
            return null;
        }

        return {
           name: user.name,
           email: user.email,
           role: user.role as Role
        };
    } catch (error) {
        console.error(error);
        return null; 
    }
};
