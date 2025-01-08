import { Product } from '@/interfaces';
import z from 'zod';


const productSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }),
    price: z.number({
        required_error: 'Price is required',
        invalid_type_error: "Price must be a number"
    }),
    stock: z.number({
        required_error: 'Stock is required',
        invalid_type_error: "Stock must be a string"
    }),
    description: z.string({
        invalid_type_error: "Description must be a string",

    }).max(60),
    supplierId: z.string({
        required_error: 'SupplierId is required',
        invalid_type_error: "SupplierId must be a string"
    }),
    companyId: z.string({
        required_error: 'companyId is required',
        invalid_type_error: "companyId must be a string"
    })
})



export function validateProduct(object: Product) {
    return productSchema.safeParse(object)
}

