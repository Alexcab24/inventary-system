import prisma from "@/lib/prisma";

interface MovementsCount {
    inbound: number;
    outbound: number;
    transfer: number;
}

export const getMovementsCount = async (companyId: string): Promise<MovementsCount> => {
    try {
    
        const [inboundCount, outboundCount, transferCount] = await Promise.all([
            prisma.productMovement.count({
                where: {
                    product: {
                        companyId: companyId
                    },
                    type: 'Inbound'
                }
            }),
            prisma.productMovement.count({
                where: {
                    product: {
                        companyId: companyId
                    },
                    type: 'Outbound'
                }
            }),
            prisma.productMovement.count({
                where: {
                    product: {
                        companyId: companyId
                    },
                    type: 'Transfer'
                }
            })
        ]);

        return {
            inbound: inboundCount,
            outbound: outboundCount,
            transfer: transferCount
        };
    } catch (error) {
        console.error('Error getting movements count:', error);
        return {
            inbound: 0,
            outbound: 0,
            transfer: 0
        };
    }
}; 