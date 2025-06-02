import { z } from "zod";

export const companySchema = z.object({
    company_name: z.string()
        .min(3, "Company name must be at least 3 characters")
        .max(50, "Company name must be less than 50 characters"),
    name: z.string()
        .min(3, "Company name must be at least 3 characters")
        .max(50, "Company name must be less than 50 characters"),
    email: z.string()
        .email("Invalid email address"),
    workspace: z.string()
        .min(3, "Workspace must be at least 3 characters")
        .max(30, "Workspace must be less than 30 characters")
        .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens are allowed"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const validateCompany = (company: unknown) => {
    return companySchema.safeParse(company);
}; 