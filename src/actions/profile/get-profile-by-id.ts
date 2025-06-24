'use server';

import prisma from "@/lib/prisma";


export const GetProfileById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });


        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,

        };
    } catch (error) {
        console.error(error);
        return null
    }
};


export const GetProfilePic = async (id: string) => {
    try {
        const profilePic = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                image: true
            }
        })

        return {
            image: profilePic?.image
        }
    } catch (error) {
        console.error(error);
        return null
    }
} 
