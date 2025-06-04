'use server';

import { Company } from "@/interfaces/company.interfaces";
import prisma from "@/lib/prisma";


export const getCompanytById = async (workspace: string): Promise<Company | null> => {
    try {
        const company = await prisma.company.findUnique({
            where: {
                workspace
            },
            select: {
                workspace: true,
                name: true,
                email: true,
                logotype: true,
                phone: true,
                address: true,
                description: true

            }
        });

        if (!company) {
            return null;
        }

        return {
            workspace: company.workspace,
            name: company.name,
            email: company.email,
            logotype: company.logotype || '',
            phone: company.phone || '',
            address: company.address || '',
            description: company.description || ''

        };

    } catch (error) {
        console.error("Error fetching company by ID:", error);
        return null;
    }
};
