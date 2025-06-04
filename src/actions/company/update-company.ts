'use server'


import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { companySchema } from "@/schemas/validation/company/companySchema";
import { revalidatePath } from "next/cache";
import { UploadImage } from '@/utils/uploadImages';



export const updateCompany = async (formData: FormData) => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    const data = Object.fromEntries(formData.entries());


    delete data.logotype;

    const productParsed = companySchema.safeParse(data);
    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false };
    }

    const company = productParsed.data;
    const workspace = session.user.companyId;

    const logotype = formData.get("logotype") as File | null;

    try {
        const updateData: any = {
            ...company
        };


        if (logotype && logotype.size > 0) {
            const image = await UploadImage(logotype);
            if (!image) {
                throw new Error('Image cannot be uploaded');
            }
            console.log(image);

            updateData.logotype = image;


        }

        await prisma.company.update({
            where: { workspace },
            data: updateData,
        });

        revalidatePath('/management/company');

        return {
            ok: true,
            message: 'Company updated successfully'
        };

    } catch (error) {
        console.error("Error updating company:", error);
        return {
            ok: false,
            message: 'Error updating company',
        };
    }
};



