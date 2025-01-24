import { Product, Role, User } from '@/interfaces';
import z from 'zod';


const userSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: "Name must be a string"
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: "Email must be a string"
    }).email(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: "Password must be a string"
    }),
    role: z.nativeEnum(Role, {
        required_error: 'Role is required',
        invalid_type_error: "Role must be one of ADMIN, USER, or ACCOUNTANT",
      }),
    companyId: z.string({
        required_error: 'CompanyId is required',
        invalid_type_error: "CompanyId must be a string"
    })
})



export function validateUser(object: User) {
    return userSchema.safeParse(object)
}

