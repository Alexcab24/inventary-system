import { v2 as cloudinary } from 'cloudinary';


cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const UploadImage = async (image: File) => {
    try {

        try {
            const buffer = await image.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
            const mime = image.type;

            return cloudinary.uploader.upload(`data:${mime};base64,${base64Image}`)
                .then(r => r.secure_url);

        } catch (error) {
            console.log(error)

            return null;
        }



    } catch (error) {

        console.log(error);

        return null;

    }
}
