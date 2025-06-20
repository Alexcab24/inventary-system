'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { productSchema } from "@/schemas/validation/productValidation";
import { UploadImage } from "@/utils/uploadImages";
import { revalidatePath } from "next/cache";


export const createProduct = async (formData: FormData) => {
    console.log(formData)
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }
    const data = Object.fromEntries(formData.entries());

    delete data.image;


    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false };
    }

    const product = productParsed.data;
    const workspace = session.user.companyId;

    const imageData = formData.get("image") as File | null;


    try {
        const newData: any = {
            ...product,
            companyId: workspace
        };


        if (imageData && imageData.size > 0) {
            const productImage = await UploadImage(imageData);

            if (!productImage || typeof productImage !== "string") {
                throw new Error("Image upload failed or did not return a valid URL");
            }
            newData.image = productImage;
        }

        const createdProduct = await prisma.products.create({
            data: newData,
        });
        await prisma.productMovement.create({
            data: {
                type: "Inbound",
                productId: createdProduct.id,
                companyId: createdProduct.companyId,
                quantity: createdProduct.stock

            }
        })

        revalidatePath(ROUTES.PRODUCTS);

        return {
            ok: true,
            message: 'Product updated successfully'
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            ok: false,
            message: 'Error creating product',
        };
    }
};
