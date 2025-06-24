'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/router/routes";
import { revalidatePath } from "next/cache";
import { UploadImage } from "@/utils/uploadImages";
import bcryptjs from 'bcryptjs';

export const UpdateProfile = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const data = Object.fromEntries(formData.entries());

    const name = data.name as string;
    const email = data.email as string;
    const password = data.password as string;
    const image = formData.get("image") as File | null;

    if (!name || !email) {
        return {
            ok: false,
            message: 'Nombre y email son obligatorios'
        }
    }

    try {
        // Primero actualizar los campos básicos
        const basicUpdateData = {
            name,
            email
        };

        if (password && password.trim() !== '') {
            if (password.length < 6) {
                return {
                    ok: false,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                }
            }
            (basicUpdateData as any).password = bcryptjs.hashSync(password);
        }

        // Actualizar campos básicos
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: basicUpdateData
        });

        // Si hay imagen, actualizarla por separado
        if (image && image.size > 0) {
            const uploadedImage = await UploadImage(image);
            if (!uploadedImage || typeof uploadedImage !== "string") {
                throw new Error("Error al subir la imagen");
            }

            await prisma.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    image: uploadedImage
                }
            });
        }

        revalidatePath(ROUTES.EDIT_PROFILE);

        return {
            ok: true,
            message: 'Perfil actualizado con éxito'
        }

    } catch (error) {
        console.error("Error updating profile:", error);
        return {
            ok: false,
            message: 'No se pudo actualizar el perfil'
        }
    }
}
