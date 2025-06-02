'use server';

import prisma from "@/lib/prisma";
import { validateCompany } from "@/schemas/validation/companyValidation";
import { revalidatePath } from "next/cache";
import bcryptjs from 'bcryptjs';

export const registerCompany = async (company_name: string, name: string, email: string, workspace: string, password: string) => {
    try {
        const formData = {
            company_name,
            name,
            email,
            workspace,
            password,
            confirmPassword: password
        };

        const result = validateCompany(formData);

        if (!result.success) {
            return {
                ok: false,
                message: "Validation error",
                errors: result.error.errors
            };
        }

        // Check if workspace already exists
        const existingCompany = await prisma.company.findUnique({
            where: {
                workspace
            }
        });

        if (existingCompany) {
            return {
                ok: false,
                message: "This workspace name is already taken"
            };
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return {
                ok: false,
                message: "This email is already registered"
            };
        }

        // Create company
        const newCompany = await prisma.company.create({
            data: {
                name: company_name,
                email,
                workspace,
            }
        });

        // Create admin user for the company
        const hashedPassword = bcryptjs.hashSync(password);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'admin',
                companyId: newCompany.workspace
            }
        });

        revalidatePath('/auth/register');

        return {
            ok: true,
            message: 'Company registered successfully',
            company: newCompany
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error registering company'
        };
    }
}; 