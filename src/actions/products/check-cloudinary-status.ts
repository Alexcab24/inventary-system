'use server';

import { isCloudinaryConfigured } from "@/utils/uploadImages";

export const checkCloudinaryStatus = async () => {
    try {
        const isConfigured = isCloudinaryConfigured();

        return {
            ok: true,
            isConfigured,
            message: isConfigured
                ? 'Cloudinary está configurado correctamente'
                : 'Cloudinary no está configurado. Verifica las variables de entorno.',
            environment: {
                hasCloudinaryUrl: !!process.env.CLOUDINARY_URL,
                hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
                hasApiKey: !!process.env.CLOUDINARY_API_KEY,
                hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
            }
        };
    } catch (error) {
        return {
            ok: false,
            isConfigured: false,
            message: 'Error al verificar configuración de Cloudinary',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}; 