'use server';

import prisma from "@/lib/prisma";
import { ProductWithRelations } from "@/interfaces";

export const getProductById = async (id: string): Promise<ProductWithRelations | null> => {
    try {
        const product = await prisma.products.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                stock: true,
                createdAt: true,
                isActive: true,
                image: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                description: true,
            },
        });

        if (!product) {

            return null;
        }

        return {
            id: product.id,
            name: product.name,
            price: product.price.toNumber(),
            stock: product.stock,
            createdAt: product.createdAt,
            category: product.category,
            supplier: product.supplier,
            image: product.image,
            isActive: product.isActive,
            description: product.description || '',
        };

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};
