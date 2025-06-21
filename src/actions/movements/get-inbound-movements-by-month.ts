'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getInboundMovementsByMonth = async () => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    }

    try {

        const currentYear = new Date().getFullYear();

        const inboundMovements = await prisma.productMovement.findMany({
            where: {
                companyId: session.user.companyId,
                type: 'Inbound',
                createdAt: {
                    gte: new Date(currentYear, 0, 1),   
                    lt: new Date(currentYear + 1, 0, 1) 
                }
            },
            select: {
                quantity: true,
                createdAt: true
            }
        });

     
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(currentYear, index).toLocaleString('default', { month: 'long' }),
            desktop: 0
        }));

    
        inboundMovements.forEach(movement => {
            const monthIndex = movement.createdAt.getMonth();
            monthlyData[monthIndex].desktop += movement.quantity;
        });

        return {
            ok: true,
            data: monthlyData
        };

    } catch (error) {
        console.error("Error al obtener los movimientos inbound por mes:", error);
        return {
            ok: false,
            message: 'Error al obtener los datos'
        };
    }
}; 