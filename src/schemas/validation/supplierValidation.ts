import { Supplier } from '@/interfaces/supplier.interface';
import z from 'zod';


const supplierSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: "Email must be a string"
    }),
    phone: z.string({
        required_error: 'Phone is required',
        invalid_type_error: "Phone must be a string"
    }),
    address: z.string({
        invalid_type_error: "Address must be a string",

    }).max(60),
    companyId: z.string({
        required_error: 'CompanyId is required',
        invalid_type_error: "CompanyId must be a string"
    })
})



export function validateSupplier(object: Supplier) {
    return supplierSchema.safeParse(object)
}

