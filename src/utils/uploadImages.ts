import { v2 as cloudinary } from 'cloudinary';


const configureCloudinary = () => {

    if (process.env.CLOUDINARY_URL) {
        cloudinary.config(process.env.CLOUDINARY_URL);
        return;
    }


    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        return;
    }


    throw new Error('Cloudinary configuration not found. Please set either CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
};


export const isCloudinaryConfigured = () => {
    try {
        configureCloudinary();
        return true;
    } catch (error) {
        return false;
    }
};

export const UploadImage = async (image: File) => {
    try {

        configureCloudinary();


        if (!image || image.size === 0) {
            throw new Error('No image provided or image is empty');
        }


        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(image.type)) {
            throw new Error(`Invalid image type. Allowed types: ${allowedTypes.join(', ')}`);
        }


        const maxSize = 10 * 1024 * 1024;
        if (image.size > maxSize) {
            throw new Error('Image size too large. Maximum size is 10MB');
        }


        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const mime = image.type;


        const uploadResult = await cloudinary.uploader.upload(
            `data:${mime};base64,${base64Image}`,
            {
                folder: 'inventory-system',
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 800, crop: 'limit' },
                    { quality: 'auto' }
                ]
            }
        );

        console.log('Image uploaded successfully:', uploadResult.secure_url);
        return uploadResult.secure_url;

    } catch (error) {
        console.error('Error uploading image:', error);


        if (error instanceof Error) {
            if (error.message.includes('Cloudinary configuration')) {
                throw new Error('Cloudinary no está configurado correctamente. Verifica las variables de entorno.');
            }
            if (error.message.includes('Invalid image type')) {
                throw new Error('Tipo de imagen no válido. Solo se permiten: JPEG, PNG, GIF, WebP');
            }
            if (error.message.includes('Image size too large')) {
                throw new Error('La imagen es demasiado grande. Máximo 10MB');
            }
        }

        throw new Error('Error al subir la imagen. Intenta de nuevo.');
    }
};
