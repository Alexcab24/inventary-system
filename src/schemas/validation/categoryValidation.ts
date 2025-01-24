import { Category } from '@/interfaces/category.interfaces';
import z from 'zod';


const categorySchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }),
    companyId: z.string({
        required_error: 'CompanyId is required',
        invalid_type_error: "CompanyId must be a string"
    })
})



export function validateCategory(object: Category) {
    return categorySchema.safeParse(object)
}

