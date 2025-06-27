'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { productSchema } from "@/schemas/validation/productValidation";
import { UploadImage, isCloudinaryConfigured } from "@/utils/uploadImages";
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

    const imageData = formData.get("image") as File | null;
    if (imageData && imageData.size > 0 && !isCloudinaryConfigured()) {
        return {
            ok: false,
            message: 'Cloudinary no está configurado correctamente. No se pueden subir imágenes.'
        };
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

    try {
        const newData: any = {
            ...product,
            companyId: workspace
        };

        if (imageData && imageData.size > 0) {
            try {
                const image = await UploadImage(imageData);
                if (!image) {
                    throw new Error('No se pudo subir la imagen');
                }
                console.log('Imagen subida exitosamente:', image);
                newData.image = image;
            } catch (uploadError) {
                console.error('Error al subir imagen:', uploadError);
                return {
                    ok: false,
                    message: uploadError instanceof Error ? uploadError.message : 'Error al subir la imagen'
                };
            }
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
            message: 'Product created successfully'
        };

    } catch (error) {
        console.error("Error general:", error);
        return {
            ok: false,
            message: error instanceof Error ? error.message : 'Error creating product',
        };
    }
};
