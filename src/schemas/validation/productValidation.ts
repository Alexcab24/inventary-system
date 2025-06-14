import { Product } from '@/interfaces';
import z from 'zod';


export const productSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }),
    price: z.coerce.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).nonnegative(),
    stock: z.coerce.number({
        required_error: "Stock is required",
        invalid_type_error: "Stock must be a number"
    }).int().nonnegative(),
    description: z.string({
        invalid_type_error: "Description must be a string",

    }).max(60).optional(),
    image: z
        .any()
        .refine(
            (file) =>
                file instanceof File ||
                typeof file === 'undefined' ||
                file === null,
            'Image must be a valid file'
        )
        .optional(),
    supplierId: z.string({
        required_error: 'SupplierId is required',
        invalid_type_error: "SupplierId must be a string"
    }),
    categoryId: z.string({
        required_error: 'CategoryId is required',
        invalid_type_error: "CategoryId must be a string"
    })
})



export function validateProduct(object: Product) {
    return productSchema.safeParse(object)
}

